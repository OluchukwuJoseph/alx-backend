import { expect } from "chai";
import kue from 'kue';
import createPushNotificationsJobs from "./8-job.js";

describe('createPushNotificationsJobs', function () {
  let queue;
  before(function () {
    queue = kue.createQueue();
    queue.testMode.enter();
  });

  after(function () {
    queue.testMode.clear();
    queue.testMode.exit();
  });

  it('display a error message if jobs is not an array', function () {
    const job = {
      phoneNumber: '+2341234567890',
      message: 'I will be champion'
    }
    expect(() => createPushNotificationsJobs(job, queue)).to.throw('Jobs is not an array');
  });

  it('create two new jobs to the queue', function () {
    const jobs = [
      {
        phoneNumber: '+2341234567890',
        message: 'I will be champion'
      },
      {
        phoneNumber: '+2341234567890',
        message: 'I will be champion'
      }
    ]
    createPushNotificationsJobs(jobs, queue);
    expect(queue.testMode.jobs.length).to.equal(2);
    expect(queue.testMode.jobs[0].data).to.deep.equal(job[0]);
    expect(queue.testMode.jobs[1].data).to.deep.equal(job[1]);
  });
});
