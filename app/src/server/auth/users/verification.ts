import sgClient from '@sendgrid/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sendgridApiKey = process.env.SENDGRID_ACCESS_KEY;
if (!sendgridApiKey) {
  throw new Error('SendGrid API key is not defined in environment variables');
}
sgClient.setApiKey(sendgridApiKey);

const getSenderStatus = async (senderEmail: string) => {
  const request : any = {
    method: 'GET',
    url: `/v3/senders?email=${senderEmail}`,
  };

  try {
    const [response, body] = await sgClient.request(request);

    if (response.statusCode === 200) {
      if (Array.isArray(body)) {
        const senderObject = body.find(
          (sender) => sender.from.email === senderEmail
        );

        if (senderObject) {
          const verificationStatus = senderObject.verified.status
            ? 'Verified'
            : 'Unverified';
          return verificationStatus;
        } else {
          return 'NotFound';
        }
      } else {
        console.error('Unexpected response body structure:', body);
        return 'Error';
      }
    } else {
      console.error('Error retrieving sender status:', body);
      return 'Error';
    }
  } catch (error) {
    console.error('Error retrieving sender status:', error);
    return 'Error';
  }
};

export const checkIdentity = async (identity: string, userId: number) => {
  try {
    const status = await getSenderStatus(identity);

    if (status === 'Verified') {
      await prisma.user.update({
        where: { id: userId },
        data: { sendEmail: true },
      });
    } else {
      await prisma.user.update({
        where: { id: userId },
        data: { sendEmail: false },
      });
    }


    return { identity, status };
  } catch (error) {
    console.error(`Error checking identity ${identity}:`, error);
    throw error;
  }
};
