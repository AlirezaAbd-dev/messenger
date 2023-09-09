import z from 'zod';

export default z.object({
   JWT_VERIFY_SECRET: z.string(),
   JWT_REFRESH_SECRET: z.string(),
   REDIS_URI: z.string(),
   REDIS_TOKEN_KEY: z.string(),
});
