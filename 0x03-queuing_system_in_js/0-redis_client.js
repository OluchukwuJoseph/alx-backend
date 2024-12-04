import { createClient } from 'redis';

const PORT = 6279;
const client = createClient();

// Runs if connection to redis-server fails
client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

// Runs if connection to redis-server is a success
client.on('connect', () => {
  console.log('Redis client connected to the server');
});
