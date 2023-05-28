import jwt from "jsonwebtoken";

import redisClient from "../config/redisClient";

const verifyTokens = async (headers: Headers) => {
  let newToken = "";
  const unverifiedToken = headers.get("x-auth-token")!.startsWith("Bearer")
    ? headers.get("x-auth-token")!.split(" ")[1]
    : "";

  const unverifiedRefreshToken = headers
    .get("x-refresh-token")!
    .startsWith("Bearer")
    ? headers.get("x-auth-token")!.split(" ")[1]
    : "";

  let verifyToken = jwt.verify(unverifiedToken, process.env.JWT_VERIFY_SECRET);

  let refreshToken;

  if (!verifyToken) {
    refreshToken = jwt.verify(
      unverifiedRefreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    if (!refreshToken) {
      return { error: "شما اجازه دسترسی ندارید!" };
    }

    let redisMembers;
    try {
      redisMembers = await redisClient.sMembers(process.env.REDIS_TOKEN_KEY);
    } catch (err) {
      console.log(err);
    }

    if (redisMembers) {
      const tokenExists = redisMembers.find(
        (member) => member === unverifiedRefreshToken
      );

      if (!tokenExists) {
        return { error: "شما اجازه دسترسی ندارید!" };
      }
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
      ? (verifyToken as unknown as jwt.JwtPayload & { email: string }).email
      : (refreshToken as unknown as jwt.JwtPayload & { email: string }).email,
    newToken,
  };
};

export default verifyTokens;
