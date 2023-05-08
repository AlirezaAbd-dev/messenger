import z from "zod";

import envSchema from "./envSchema";

const envs = envSchema.safeParse(process.env);

if (!envs.success) {
  throw {
    cause: "env property is missing!",
    error: envs.error.errors,
  };
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
