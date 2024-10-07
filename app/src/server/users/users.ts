// import * as fs from 'fs';
// import { IAMClient, CreateUserCommand, AddUserToGroupCommand, CreateAccessKeyCommand, GetUserCommand } from "@aws-sdk/client-iam";
// import AWS from 'aws-sdk';
// import sgMail from '@sendgrid/mail';
import sgClient from '@sendgrid/client';

const sendgridApiKey = process.env.SENDGRID_ACCESS_KEY;
if (!sendgridApiKey) {
  throw new Error('SendGrid API key is not defined in environment variables');
}
sgClient.setApiKey(sendgridApiKey);

export const Manageawsuser = async (username: string) => {
  const request : any = {
    url: '/v3/marketing/senders',
    method: 'POST',
    body: {
      nickname: username, //this should be unique
      from: {
        email: username,
        name: username, //this should be unique
      },
      reply_to: {
        email:  username,
        name: username, //this should be unique
      },
      address: '123 Elm St.11',
      address_2: 'Apt. 45611',
      city: 'Denver11',
      state: 'Colorado',
      zip: '8020211',
      country: 'United States',
    },
  };

  try {
    const [response, body] = await sgClient.request(request);

    if (response.statusCode === 201) {
      console.log('Sender identity created successfully:', body);
    } else {
      console.error('Error creating sender identity:', body);
    }
  } catch (error) {
    console.error('Error creating sender identity:', error);
  }

    /*
 try{
    AWS.config.update({ 
        region: 'eu-north-1',
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_KEY_ID!,
        },
    });

    console.log('well i go by',username) ;
// Create promise and SES service object
var verifyEmailPromise = new AWS.SES({ apiVersion: "2010-12-01" })
  .verifyEmailIdentity({ EmailAddress: username })
  .promise();

// Handle promise's fulfilled/rejected states
verifyEmailPromise
  .then(function (data : any) {
    console.log("Email verification initiated",data);
  })
  .catch(function (err : any) {
    console.error(err, err.stack);
  });

 } catch (error) {
    console.error('Error managing user:', error);
}

*/

    /*
    try {
        // Create IAM client
        const client = new IAMClient({
            region: 'eu-north-1', // Specify the appropriate region
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_KEY_ID!
            },
        });

        // Check if the IAM user already exists
        try {
            const getUserCommand = new GetUserCommand({ UserName: username });
            const userResponse = await client.send(getUserCommand);
            console.log(`User ${username} already exists:`, userResponse);
            return; // Exit the function if user exists
        } catch (error: any) {
            if (error.name === 'NoSuchEntity') {
                // Continue with user creation if user does not exist
                console.log(`User ${username} does not exist, proceeding with creation.`);
            }
        }

        // Create IAM user
        const userParams = {
            UserName: username,
        };
        const createUserCommand = new CreateUserCommand(userParams);
        const createUserResponse = await client.send(createUserCommand);
        console.log('User created successfully:', createUserResponse);

        // Add user to group
        const groupParams = {
            GroupName: groupName,
            UserName: username,
        };
        const addUserToGroupCommand = new AddUserToGroupCommand(groupParams);
        const addUserToGroupResponse = await client.send(addUserToGroupCommand);
        console.log('User added to group successfully:', addUserToGroupResponse);

        // Create access keys for the user
        const accessKeyParams = {
            UserName: username,
        };
        const createAccessKeyCommand = new CreateAccessKeyCommand(accessKeyParams);
        const accessKeyResponse = await client.send(createAccessKeyCommand);
        console.log('Access keys created successfully:', accessKeyResponse);

        // Update environment variables with new access keys
        process.env.AWS_ACCESS_KEY_ID = accessKeyResponse.AccessKey?.AccessKeyId ?? '';
        process.env.AWS_SECRET_KEY_ID = accessKeyResponse.AccessKey?.SecretAccessKey ?? '';
        console.log('Environment variables updated with new access keys');

        // Update .env file with new access keys
        const envPath = '../../../.env.server'; // Path to your .env file
        const envConfig = fs.readFileSync(envPath, 'utf8');
        const updatedEnvConfig = envConfig.replace(
          //  /AWS_ACCESS_KEY_ID=[^\n]*///,
        //    `AWS_ACCESS_KEY_ID=${process.env.AWS_ACCESS_KEY_ID}`
      //  ).replace(
         //   /AWS_SECRET_KEY_ID=[^\n]*/,
        //    `AWS_SECRET_KEY_ID=${process.env.AWS_SECRET_KEY_ID}`
      /*  );
        fs.writeFileSync(envPath, updatedEnvConfig);
        console.log('Environment variables updated in .env file');
    } catch (error) {
        console.error('Error managing user:', error);
    } */
}