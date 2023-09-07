import envSchema from './envSchema';

declare global {
   namespace NodeJS {
      interface ProcessEnv {
         DATABASE_URL: string;
      }
   }
}

const envValidate = envSchema.safeParse(process.env);

if (!envValidate.success) {
   throw new Error(envValidate.error.message);
}

export {};
