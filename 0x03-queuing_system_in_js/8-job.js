/**
 * Adds jobs to queue 'push_notification_code_3'
 * @param {Array} jobs - list of object containing job data
 * @param {import('kue').Queue} queue - queue object
 */
function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }
  jobs.forEach((jobData) => {
    const job = queue.create('push_notification_code_3', jobData);
    job.save((error) => {
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
}

export default createPushNotificationsJobs;
