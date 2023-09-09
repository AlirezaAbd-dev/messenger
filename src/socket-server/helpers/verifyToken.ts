import jwt from "jsonwebtoken";
import { IncomingHttpHeaders } from "http";

import redisClient from "../config/redisClient";

const verifyTokens = async (
  headers: IncomingHttpHeaders,
  callback: (err?: string, email?: string) => void
) => {
  let newToken = "";

  // Removin the Bearer from headers
  const unverifiedToken = (headers["x-auth-token"] as string).startsWith(
    "Bearer"
  )
    ? (headers["x-auth-token"] as string).split(" ")[1]
    : "";
  const unverifiedRefreshToken = (
    headers["x-refresh-token"] as string
  ).startsWith("Bearer")
    ? (headers["x-refresh-token"] as string).split(" ")[1]
    : "";

  let refreshToken;
  let verifyToken;

  try {
    // Verify the token
    verifyToken = jwt.verify(unverifiedToken, process.env.JWT_VERIFY_SECRET);
  } catch (_err) {
    // Process the refresh token if verify token is not valid
    try {
      refreshToken = jwt.decode(unverifiedRefreshToken);
    } catch (err) {
      return callback("شما اجازه دسترسی ندارید!");
    }

    // Check if there is the same token in redis or what?
    let redisMembers;
    try {
      redisMembers = await redisClient.sIsMember(
        process.env.REDIS_TOKEN_KEY,
        unverifiedRefreshToken
      );
    } catch (err) {
      console.log(err);
    }

    if (!redisMembers) {
      return callback("شما اجازه دسترسی ندارید!");
    }

    // Making a new token if the check above was true
    newToken = jwt.sign(
      { email: (refreshToken as jwt.JwtPayload).email },
      process.env.JWT_VERIFY_SECRET,
      {
        expiresIn: "15m",
      }
    );
  }

  // Retiurning data from token
  return callback(
    undefined,
    verifyToken
      ? (verifyToken as unknown as jwt.JwtPayload & { email: string }).email
      : (refreshToken as unknown as jwt.JwtPayload & { email: string }).email
  );
};

export default verifyTokens;
