import z from "zod";

export default z.object({
  POSTGRESQL_URI: z.string(),
  JWT_SECRET: z.string(),
});
