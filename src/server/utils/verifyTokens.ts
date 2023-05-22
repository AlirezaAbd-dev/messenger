import jwt from "jsonwebtoken";

import redisClient from "../config/redisClient";

const verifyTokens = async (headers: Headers) => {
  let newToken = "";

  let verifyToken = jwt.verify(
    headers.get("x-auth-token")!,
    process.env.JWT_VERIFY_SECRET
  );

  let refreshToken;

  if (!verifyToken) {
    refreshToken = jwt.verify(
      headers.get("x-refresh-token")!,
      process.env.JWT_REFRESH_SECRET
    );

    if (!refreshToken) {
      throw new Error("شما اجازه دسترسی ندارید!");
    }

    const redisMembers = await redisClient.sMembers(
      process.env.REDIS_TOKEN_KEY
    );

    const tokenExists = redisMembers.find(
      (member) => member === headers.get("x-refresh-token")
    );

    if (!tokenExists) {
      throw new Error("شما اجازه دسترسی ندارید!");
    }

    newToken = jwt.sign(
      { email: (refreshToken as jwt.JwtPayload).email },
      process.env.JWT_VERIFY_SECRET,
      {
        expiresIn: "15m",
      }
    );
  }
  return {
    email: verifyToken
      ? (verifyToken as jwt.JwtPayload & { email: string }).email
      : (refreshToken as jwt.JwtPayload & { email: string }).email,
    newToken,
  };
};

export default verifyTokens;
