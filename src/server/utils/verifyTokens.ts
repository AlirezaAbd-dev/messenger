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
    ? headers.get("x-refresh-token")!.split(" ")[1]
    : "";

  let refreshToken;
  let verifyToken;

  try {
    verifyToken = jwt.verify(unverifiedToken, process.env.JWT_VERIFY_SECRET);
  } catch (_err) {
    try {
      refreshToken = jwt.decode(unverifiedRefreshToken);
    } catch (err) {
      return { error: "شما اجازه دسترسی ندارید!" };
    }

    let redisMembers;
    try {
      console.time("redis");

      await redisClient.connect();
      redisMembers = await redisClient.sIsMember(
        process.env.REDIS_TOKEN_KEY,
        unverifiedRefreshToken
      );
      await redisClient.disconnect();

      console.timeEnd("redis");
    } catch (err) {
      console.log(err);
    }

    if (!redisMembers) {
      return { error: "شما اجازه دسترسی ندارید!" };
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
