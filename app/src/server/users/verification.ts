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

/* import AWS from 'aws-sdk';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); 

// Configure AWS SDK
AWS.config.update({ region: 'eu-north-1',
credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_KEY_ID!,
},
 });

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

// Function to list all identities with pagination
const listAllIdentities = async (identityType?: 'EmailAddress' | 'Domain') => {
  let identities: string[] = [];
  let nextToken: string | undefined = undefined;
  
  do {
    const params: AWS.SES.ListIdentitiesRequest = {
      IdentityType: identityType,
      MaxItems: 1000,  // Specify MaxItems to control the batch size
      NextToken: nextToken,
    };

    try {
      const result = await ses.listIdentities(params).promise();
      identities = identities.concat(result.Identities);
      nextToken = result.NextToken;
    } catch (error) {
      console.error('Error listing identities:', error);
      throw error;
    }
  } while (nextToken);

  return identities;
};

// Function to get verification status of a specific identity
const getIdentityVerificationStatus = async (identity: string) => {
  const params = {
    Identities: [identity]
  };

  try {
    const result = await ses.getIdentityVerificationAttributes(params).promise();
    const verificationAttributes = result.VerificationAttributes[identity];
    if (verificationAttributes) {
      return verificationAttributes.VerificationStatus;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error getting verification status for ${identity}:`, error);
    throw error;
  }
};

// Function to check if a specific identity is present and its verification status
export const checkIdentity = async (identity: string, userId: number) => {

  try {
    const identities = await listAllIdentities();
    if (identities.includes(identity)) {
      const status = await getIdentityVerificationStatus(identity);
      if(status === 'Success'){
         // Update the sendEmail property of the user entity
          await prisma.user.update({
        where: { id: userId },
        data: { sendEmail: true },
      }); 
      }
      else{
        console.log('add false to user senmail property of user entity')
      }
    } else {
      return { identity, status: 'NotFound' };
    }
  } catch (error) {
    console.error(`Error checking identity ${identity}:`, error);
    throw error;
  }

};
*/
