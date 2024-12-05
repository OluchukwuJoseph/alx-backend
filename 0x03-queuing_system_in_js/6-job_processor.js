import kue from 'kue';

const queue = kue.createQueue();

/**
 * Handles notification jobs for queue 'push_notification_code'
 * @param {string} phoneNumber - user phone number
 * @param {string} message - push notification message
 * @returns {void}
 */
function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

queue.process('push_notification_code', (job, done) => {
  try {
    sendNotification(job.data.phoneNumber, job.data.message);
    done();
  } catch(error) {
    done(error);
  }
});
