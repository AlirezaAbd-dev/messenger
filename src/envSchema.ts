import z from "zod";

export default z.object({
  JWT_VERIFY_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  NODEMAILER_USER: z.string(),
  NODEMAILER_PASS: z.string(),
  REDIS_URI: z.string(),
  REDIS_TOKEN_KEY: z.string(),
  MONGO_URI: z.string(),
  API_URL: z.string(),
});
