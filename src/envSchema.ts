import { z } from 'zod';

const envSchema = z.object({
   DATABASE_URL: z.string(),
   JWT_VERIFY_SECRET: z.string(),
   JWT_REFRESH_SECRET: z.string(),
   NODEMAILER_USER: z.string(),
   NODEMAILER_PASS: z.string(),
   REDIS_URI: z.string(),
   REDIS_TOKEN_KEY: z.string(),
});

export default envSchema;
