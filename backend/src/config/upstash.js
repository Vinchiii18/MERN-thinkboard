import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

import dotenv from 'dotenv';
dotenv.config();

// Create a new ratelimiter, that allows 10 requests per 20sec
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, '20 s'), // 100 requests per 60 seconds
    analytics: true,
});

export default ratelimit;