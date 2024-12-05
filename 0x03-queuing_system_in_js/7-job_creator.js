import kue from 'kue';

const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account'
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153518743',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153538781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153118782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4159518782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4158718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153818782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4154318781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4151218782',
    message: 'This is the code 4321 to verify your account'
  }
];

const queue = kue.createQueue();

// Create `push_notification_code_2` job for each object in jobs
jobs.forEach((jobObject) => {
  const job = queue.create('push_notification_code_2', jobObject)
  .save((error) => {
    if (!error) {
      console.log(`Notification job created: ${job.id}`);
    } else {
      console.log(`An error occured while adding job to queue: ${error.toString()}`);
    }
  });

  // Runs when job is completed without an error
  job.on('complete', () => {
    console.log(`Notification job ${job.id} completed`);
  });

  // Runs when job failed
  job.on('failed', (error) => {
    console.log(`Notification job ${job.id} failed: ${error}`)
  });

  // Runs when job execution is makes a progress
  job.on('progress', (percent) => {
    console.log(`Notification job ${job.id} ${percent}% complete`);
  });
});
