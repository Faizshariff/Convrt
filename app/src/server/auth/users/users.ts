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

}