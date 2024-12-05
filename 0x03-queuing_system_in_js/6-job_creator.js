import kue from 'kue';

const queue = kue.createQueue();
const job = queue.createJob('push_notification_code', {
  phoneNumber: '+2341234567890',
  message: 'I will be champion one day',
}).save((error) => {
  if (!error) {
    console.log(`Notification job created: ${job.id}`);
  } else {
    console.log(`An error occured while adding job to queue: ${error.toString()}`);
  }
});

// Runs when job is completed without an error
job.on('complete', () => {
  console.log('Notification job completed');
});

// Runs when job execution fails
job.on('failed', () => {
  console.log('Notification job failed');
});
