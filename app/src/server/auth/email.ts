import { type GetVerificationEmailContentFn, type GetPasswordResetEmailContentFn } from "wasp/server/auth";
import { sendverifyEmail } from "./sendGridEmailSender";

export const getVerificationEmailContent: GetVerificationEmailContentFn = ({ verificationLink }) => ({
  subject: 'Verify your email',
  text: `Click the link below to verify your email: ${verificationLink}`,
  html: `
        <p>Click the link below to verify your email</p>
        <a href="${verificationLink}">Verify email</a>
    `,
});

export const getPasswordResetEmailContent: GetPasswordResetEmailContentFn = ({ passwordResetLink }) => ({
  subject: 'Password reset',
  text: `Click the link below to reset your password: ${passwordResetLink}`,
  html: `
        <p>Click the link below to reset your password</p>
        <a href="${passwordResetLink}">Reset password</a>
    `,
});

export const sendVerificationEmail = async ({ to, verificationLink }: any) => {
  const { subject, text, html } = getVerificationEmailContent({ verificationLink });
  await sendverifyEmail({ to, subject, text, html });
};

export const sendPasswordResetEmail = async ({ to, passwordResetLink } : any) => {
  const { subject, text, html } = getPasswordResetEmailContent({ passwordResetLink });
  await sendverifyEmail({ to, subject, text, html });
};