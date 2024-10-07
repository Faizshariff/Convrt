import { Request, Response } from 'express';
import { Emailsns } from 'wasp/server/api';
import crypto from 'crypto';

// Helper function to verify the webhook signature
const verifySignature = (req: Request, publicKey: string) => {
  const signature = req.get('x-twilio-email-event-webhook-signature') as string;
  const timestamp = req.get('x-twilio-email-event-webhook-timestamp') as string;
  const payload = req.body;

  if (!signature || !timestamp) {
    return false;
  }

  const signedPayload = timestamp + JSON.stringify(payload);
  const computedSignature = crypto
    .createHmac('sha256', publicKey)
    .update(signedPayload)
    .digest('hex');

  return computedSignature === signature;
};

export const emailsns: Emailsns = async (req: Request, res: Response, context) => {

  /*
   console.log('Headers:', req.headers);
   console.log('Body:', req.body);

  const sendgridWebhookPublicKey = process.env.SENDGRID_WEBHOOK_PK;
  if (!sendgridWebhookPublicKey) {
    return res.status(500).send('SendGrid Webhook public key is not defined in environment variables');
  }

  if (!verifySignature(req, sendgridWebhookPublicKey)) {
    return res.status(401).send('Unauthorized');
  }

  */

  const events = req.body;

  for (const event of events) {
    console.log(`Received event: ${event.event} for email: ${event.email}`);

    // Determine the new status based on the event type
    let newStatus = '';
    switch (event.event) {
      case 'delivered':
        newStatus = 'DELIVERED';
        break;
      case 'open':
        newStatus = 'OPENED';
        break;
      case 'click':
        newStatus = 'CLICKED';
        break;
      case 'bounce':
        newStatus = 'BOUNCED';
        break;
      case 'unsubscribe':
        newStatus = 'UNSUBSCRIBED';
        break;
      default:
        console.log(`Unhandled event: ${event.event}`);
        continue;
    }

    // Update the email entity based on the unique argument
    try {
      await context.entities.Email.updateMany({
        where: { id: event.unique_arg },
        data: {
          status: newStatus,
          opened: event.event === 'open' ? true : undefined,
          delivered: event.event === 'delivered' ? true : undefined,
          bounced: event.event === 'bounce' ? true : undefined,
          unsubscribed: event.event === 'unsubscribe' ? true : undefined,
        },
      });
      console.log(`Email status updated to: ${newStatus} for email: ${event.email}`);
    } catch (error) {
      console.error(`Error updating email status for email: ${event.email}`, error);
    }
  }

  res.status(200).send('Webhook received successfully');
};
