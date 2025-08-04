import { Resend } from "resend";
import { emailConfig } from "./config";

if (!emailConfig.apiKey) {
  throw new Error("RESEND_API_KEY is not set");
}

const resend = new Resend(emailConfig.apiKey);

export const sendEmail = async ({
  to,
  subject,
  text,
  html,
  replyTo,
}: {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string | string[];
}) => {
  const { data, error } = await resend.emails.send({
    from: emailConfig.from.admin,
    to,
    subject,
    text,
    html,
    ...(replyTo && { replyTo }),
  });

  if (error) {
    console.error("Error sending email:", error.message);
    throw error;
  }

  return data;
};
