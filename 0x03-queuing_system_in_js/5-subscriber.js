import redis from "redis";

const client = redis.createClient();

// Runs if connection to redis-server fails
client.on('error', (error) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

// Runs if connection to redis-server is a success
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Runs when a message is recieved
client.on('message', (channel, message) => {
  console.log(message);
  if (message === 'KILL_SERVER') {
    client.unsubscribe(channel);
    client.quit();
  }
})

client.subscribe('holberton school channel');
