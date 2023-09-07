function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL) return `https://undefined`;
  return "http://localhost:3000";
}

export function getUrl() {
  return getBaseUrl() + "/api/trpc";
}