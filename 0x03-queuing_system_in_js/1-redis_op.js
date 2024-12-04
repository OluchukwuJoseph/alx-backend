import redis from "redis";

const client = redis.createClient();

// Runs if connection to redis-server fails
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

// Runs if connection to redis-server is a success
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

/**
 * Sets a new key-value pair in Redis with the specified school name and value.
 *
 * @function setNewSchool
 * @param {string} schoolName - The key to be used in the Redis store, representing the school's name.
 * @param {*} value - The value to be stored for the given school name. Can be of any type that Redis supports.
 * @throws {Error} Potential Redis connection or set operation errors.
 * @example
 * // Store a school's information
 * setNewSchool('HolbertonSchool', 'San Francisco');
 *
 * @returns {void}
 */
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print);
}

/**
 * Retrieves and displays the value associated with a given school name from Redis.
 *
 * @function displaySchoolValue
 * @param {string} schoolName - The key to lookup in the Redis store.
 * @throws {Error} Handles and logs any errors during the Redis get operation.
 * @example
 * // Retrieve and log a school's information
 * displaySchoolValue('HolbertonSchool');
 * // Output might be: San Francisco
 *
 * @returns {void}
 */
function displaySchoolValue(schoolName) {
  client.get(schoolName, (err, reply) => {
    if (err) {
      console.log(`An error occured: ${err.toString()}`);
      return;
    }
    console.log(reply);
  });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
