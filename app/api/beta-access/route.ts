import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { prisma } from '@/libs/prisma';
import { emailConfig } from '@/libs/config';

const resend = emailConfig.apiKey ? new Resend(emailConfig.apiKey) : null;

export async function POST(req: NextRequest) {
  try {
    const { email, additionalInfo, timestamp } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Prepare email content
    const emailSubject = 'New Beta Access Request - VisionsAlign';
    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1e293b, #0f172a); padding: 2rem; border-radius: 12px; color: white;">
          <h1 style="color: #10b981; margin: 0 0 1.5rem 0; font-size: 1.5rem;">New Beta Access Request</h1>
          
          <div style="background: rgba(255, 255, 255, 0.05); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
            <h2 style="color: #e2e8f0; margin: 0 0 1rem 0; font-size: 1.1rem;">Contact Information</h2>
            <p style="margin: 0.5rem 0; color: #cbd5e1;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 0.5rem 0; color: #cbd5e1;"><strong>Submitted:</strong> ${new Date(timestamp).toLocaleString()}</p>
          </div>

          ${additionalInfo ? `
          <div style="background: rgba(255, 255, 255, 0.05); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
            <h2 style="color: #e2e8f0; margin: 0 0 1rem 0; font-size: 1.1rem;">Role & Challenge Details</h2>
            <p style="margin: 0; color: #cbd5e1; line-height: 1.6;">${additionalInfo}</p>
          </div>
          ` : ''}

          <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); padding: 1rem; border-radius: 8px;">
            <p style="margin: 0; color: #10b981; font-size: 0.9rem;">
              <strong>Next Steps:</strong> Review this request and send beta access details to the user within 48 hours.
            </p>
          </div>
        </div>
      </div>
    `;

    const emailText = `
New Beta Access Request - VisionsAlign

Email: ${email}
Submitted: ${new Date(timestamp).toLocaleString()}

${additionalInfo ? `Role & Challenge Details:\n${additionalInfo}\n\n` : ''}

Next Steps: Review this request and send beta access details to the user within 48 hours.
    `;

    // Send email notification
    if (resend && emailConfig.apiKey) {
      await resend.emails.send({
        from: emailConfig.from.noReply,
        to: ['beta-access@visionsalign.com'],
        subject: emailSubject,
        html: emailHtml,
        text: emailText,
      });
    } else {
      // Log to console if no email service configured
      console.log('Beta Access Request (Email service not configured):');
      console.log('Email:', email);
      console.log('Additional Info:', additionalInfo);
      console.log('Timestamp:', timestamp);
    }

    // Send confirmation email to user
    if (resend && emailConfig.apiKey) {
      const confirmationHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1e293b, #0f172a); padding: 2rem; border-radius: 12px; color: white;">
            <div style="text-align: center; margin-bottom: 2rem;">
              <h1 style="color: #10b981; margin: 0 0 0.5rem 0; font-size: 1.8rem;">Welcome to VisionsAlign Beta!</h1>
              <p style="color: #cbd5e1; margin: 0; font-size: 1.1rem;">Your request has been received</p>
            </div>
            
            <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
              <h2 style="color: #10b981; margin: 0 0 1rem 0; font-size: 1.2rem;">What happens next?</h2>
              <ul style="color: #cbd5e1; line-height: 1.6; margin: 0; padding-left: 1.2rem;">
                <li>We'll review your request within 48 hours</li>
                <li>You'll receive beta access credentials via email</li>
                <li>Get exclusive early access to The Insight Panel</li>
                <li>Help shape the future of executive communication</li>
              </ul>
            </div>

            <div style="background: rgba(255, 255, 255, 0.05); padding: 1.5rem; border-radius: 8px; text-align: center;">
              <p style="color: #e2e8f0; margin: 0 0 1rem 0;">
                <strong>Questions about your beta access?</strong>
              </p>
              <p style="color: #cbd5e1; margin: 0;">
                Email us directly at <a href="mailto:${emailConfig.from.betaAccess}" style="color: #10b981;">${emailConfig.from.betaAccess}</a>
              </p>
            </div>
          </div>
        </div>
      `;

      await resend.emails.send({
        from: emailConfig.from.noReply,
        to: [email],
        subject: 'Welcome to VisionsAlign Beta - Request Received',
        html: confirmationHtml,
        text: `Welcome to VisionsAlign Beta!

Your beta access request has been received. Here's what happens next:

• We'll review your request within 48 hours
• You'll receive beta access credentials via email  
• Get exclusive early access to The Insight Panel
• Help shape the future of executive communication

Questions? Email us at beta-access@visionsalign.com

Thank you for your interest in VisionsAlign!`,
      });
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Beta access request submitted successfully' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Beta access request error:', error);
    return NextResponse.json(
      { error: 'Failed to submit beta access request' },
      { status: 500 }
    );
  }
}
