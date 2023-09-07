import { z } from 'zod';

const envSchema = z.object({
   DATABASE_URL: z.string(),
});

export default envSchema;
process.env;
