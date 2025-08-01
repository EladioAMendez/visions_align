import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { prisma } from "@/libs/prisma";
import configFile from "@/config";
import { findCheckoutSession } from "@/libs/stripe";
import { PlanTier } from "@/lib/generated/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
  typescript: true,
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// This is where we receive Stripe webhook events
// It's used to update user data, send emails, etc...
// By default, it'll store the user in the database
// See more: https://shipfa.st/docs/features/payments
export async function POST(req: NextRequest) {

  const body = await req.text();

  const signature = headers().get("stripe-signature");

  let eventType;
  let event;

  // verify Stripe event is legit
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed. ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  eventType = event.type;

  try {
    switch (eventType) {
      case "checkout.session.completed": {
        // First payment is successful and a subscription is created (if mode was set to "subscription" in ButtonCheckout)
        // ✅ Grant access to the product
        const stripeObject: Stripe.Checkout.Session = event.data
          .object as Stripe.Checkout.Session;

        const session = await findCheckoutSession(stripeObject.id);

        const customerId = session?.customer;
        const priceId = session?.line_items?.data[0]?.price.id;
        const userId = stripeObject.client_reference_id;
        const plan = configFile.stripe.plans.find((p) => p.priceId === priceId);

        if (!plan) break;

        const customer = (await stripe.customers.retrieve(
          customerId as string
        )) as Stripe.Customer;

        let user;

        // Get or create the user. userId is normally passed in the checkout session (clientReferenceID) to identify the user when we get the webhook event
        if (userId) {
          user = await prisma.user.findUnique({ where: { id: userId } });
        } else if (customer.email) {
          user = await prisma.user.findUnique({ where: { email: customer.email } });

          if (!user) {
            user = await prisma.user.create({
              data: {
                email: customer.email,
                name: customer.name,
              },
            });
          }
        } else {
          console.error("No user found");
          throw new Error("No user found");
        }

        // Update user data + Grant user access to your product and set plan tier
        const planTier = plan.name === 'Pro' ? PlanTier.PRO : plan.name === 'Director' ? PlanTier.DIRECTOR : PlanTier.STARTER;
        const playbookCredits = plan.name === 'Pro' ? 10 : plan.name === 'Director' ? 25 : 1;
        
        await prisma.user.update({
          where: { id: user.id },
          data: {
            stripePriceId: priceId,
            stripeCustomerId: customerId as string,
            hasAccess: true,
            planTier,
            playbookCredits,
          },
        });

        // Extra: send email with user link, product page, etc...
        // try {
        //   await sendEmail(...);
        // } catch (e) {
        //   console.error("Email issue:" + e?.message);
        // }

        break;
      }

      case "checkout.session.expired": {
        // User didn't complete the transaction
        // You don't need to do anything here, but you can send an email to the user to remind them to complete the transaction, for instance
        break;
      }

      case "customer.subscription.updated": {
        // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
        // You don't need to do anything here, because Stripe will let us know when the subscription is canceled for good (at the end of the billing cycle) in the "customer.subscription.deleted" event
        // You can update the user data to show a "Subscription ending soon" badge for instance
        break;
      }

      case "customer.subscription.deleted": {
        // The customer subscription stopped
        // ❌ Revoke access to the product
        const stripeObject: Stripe.Subscription = event.data
          .object as Stripe.Subscription;

        const subscription = await stripe.subscriptions.retrieve(
          stripeObject.id
        );
        const user = await prisma.user.findUnique({ 
          where: { stripeCustomerId: subscription.customer as string } 
        });

        if (user) {
          // Revoke access to your product and reset to starter plan
          await prisma.user.update({
            where: { id: user.id },
            data: {
              hasAccess: false,
              planTier: PlanTier.STARTER,
              playbookCredits: 1,
            },
          });
        }

        break;
      }

      case "invoice.paid": {
        // Customer just paid an invoice (for instance, a recurring payment for a subscription)
        // ✅ Grant access to the product

        const stripeObject: Stripe.Invoice = event.data
          .object as Stripe.Invoice;

        const priceId = stripeObject.lines.data[0].price.id;
        const customerId = stripeObject.customer;

        const user = await prisma.user.findUnique({ 
          where: { stripeCustomerId: customerId as string } 
        });

        if (!user) break;

        // Make sure the invoice is for the same plan (priceId) the user subscribed to
        if (user.stripePriceId !== priceId) break;

        // Grant user access to your product
        await prisma.user.update({
          where: { id: user.id },
          data: { hasAccess: true },
        });

        break;
      }

      case "invoice.payment_failed":
        // A payment failed (for instance the customer does not have a valid payment method)
        // ❌ Revoke access to the product
        // ⏳ OR wait for the customer to pay (more friendly):
        //      - Stripe will automatically email the customer (Smart Retries)
        //      - We will receive a "customer.subscription.deleted" when all retries were made and the subscription has expired

        break;

      default:
      // Unhandled event type
    }
  } catch (e) {
    console.error("stripe error: ", e.message);
  }

  return NextResponse.json({});
}
