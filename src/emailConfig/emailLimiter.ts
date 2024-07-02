import Bottleneck from 'bottleneck';

// Create a new limiter
const limiter = new Bottleneck({
  maxConcurrent: 5, // Maximum number of concurrent emails
  minTime: 1000, // Minimum time between each email in milliseconds (1 email per second)
});

export default limiter;
