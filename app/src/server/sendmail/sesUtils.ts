import sgMail from '@sendgrid/mail';
import PQueue from 'p-queue';
import { Task } from '@prisma/client';
import { getAllTasksByUser } from '../queries';

const sendgridApiKey = process.env.SENDGRID_ACCESS_KEY;

console.log("dddisssssssss",process.env.SENDGRID_ACCESS_KEY)

if (!sendgridApiKey) {
  throw new Error('SendGrid API key is not defined in environment variables');
}

sgMail.setApiKey(sendgridApiKey);

const chunkArray = (array: any, chunkSize: any) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

const queue = new PQueue({ concurrency: 5 });

export const sendEmail = async ({
  to,
  from,
  subject,
  body,
  tag,
  schedule ,
  emailIDs,
  mergeTags,
  context
}: {
  to: string[],
  from: string,
  subject: string,
  body: string,
  tag: string,
  schedule?: any,
  emailIDs: string[],
  mergeTags: any[],
  context: any // Assuming context is passed to this function
}) => {
  try {
    if (!to || !emailIDs || !mergeTags) {
      throw new Error('Missing required email parameters');
    }

    if (!to.length || !emailIDs.length || !mergeTags.length) {
      throw new Error('Email parameters cannot be empty');
    }

    // Fetch tasks
    const tasks: Task[] = await getAllTasksByUser(undefined, context);

    // Split the recipients into batches of 1000
    const batches = chunkArray(to, 1000);
    const idBatches = chunkArray(emailIDs, 1000);

    const batchPromises = batches.map((batch, batchIndex) => {
      return queue.add(async () => {
        const personalizations = batch.map((email: string, index: number) => {
          const task = tasks.find((task: Task) => task.email === email);
          if (!task) {
            throw new Error(`Task not found for email: ${email}`);
          }

          return {
            to: email,
            custom_args: { unique_arg: idBatches[batchIndex][index] },
            substitutions: {
              email: task.email,
              description: task.description,
              Tag : task.Tag,
              name : task.name,
              Subscribed : task.Subscribed ,
              createdAt : task.createdAt ,
              id : task.id , 
              isDone : task.isDone ,
              time : task.time ,
              userId : task.userId

            }
          };
        });

        const msg = {
          personalizations,
          from,
          subject,
          html: body,
          customArgs: { tag },
          sendAt: schedule?.sendAt,
        };

        try {
          await sgMail.sendMultiple(msg);
          console.log(`Batch of ${batch.length} emails sent successfully!`);
        } catch (error: any) {
          console.error('Error sending batch:', error);
          if (error.response) {
            console.error('SendGrid response error:', error.response.body);
          }
        }
      });
    });

    await Promise.all(batchPromises);
  } catch (error) {
    console.error('Error:', error);
  }
};