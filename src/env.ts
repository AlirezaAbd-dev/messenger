import { z } from 'zod';
import envSchema from './envSchema';

declare global {
   namespace NodeJS {
      interface ProcessEnv extends z.infer<typeof envSchema> {}
   }
}

const envValidate = envSchema.safeParse(process.env);

if (!envValidate.success) {
   throw new Error(envValidate.error.message);
}

export {};
