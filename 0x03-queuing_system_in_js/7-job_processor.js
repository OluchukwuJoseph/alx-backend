import kue from 'kue';

const blackListed = ['4153518780', '4153518781'];

/**
 * Handles notification jobs for queue 'push_notification_code_2'
 * @param {string} phoneNumber - user phone number
 * @param {string} message - notification message
 * @param {import('kue').Job}} job - queue job
 * @param {import('kue').DoneCallback} done - done call back
 * @returns {void}
 */
function sendNotification(phoneNumber, message, job, done) {
  job.progress(0, 100);
  if (blackListed.includes(phoneNumber)) {
    done(new Error(`Phone number ${phoneNumber} is blacklisted`));
    return;
  }
  job.progress(50, 100);
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
  done();
}

const queue = kue.createQueue();

queue.process('push_notification_code_2', 2, (job, done) => {
  sendNotification(job.data.phoneNumber, job.data.message, job, done);
});
