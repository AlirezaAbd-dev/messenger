import jwt from "jsonwebtoken";

import redisClient from "../config/redisClient";

const verifyTokens = async (headers: Headers) => {
  let newToken = "";

  // Removin the Bearer from headers
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
    // Verify the token
    verifyToken = jwt.verify(unverifiedToken, process.env.JWT_VERIFY_SECRET);
  } catch (_err) {
    // Process the refresh token if verify token is not valid
    try {
      refreshToken = jwt.decode(unverifiedRefreshToken);
    } catch (err) {
      return { error: "شما اجازه دسترسی ندارید!" };
    }

    // Check if there is the same token in redis or what?
    let redisMembers;
    try {
      await redisClient.connect();
      redisMembers = await redisClient.sIsMember(
        process.env.REDIS_TOKEN_KEY,
        unverifiedRefreshToken
      );
      await redisClient.disconnect();
    } catch (err) {
      console.log(err);
    }

    if (!redisMembers) {
      return { error: "شما اجازه دسترسی ندارید!" };
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
  return {
    email: verifyToken
      ? (verifyToken as unknown as jwt.JwtPayload & { email: string }).email
      : (refreshToken as unknown as jwt.JwtPayload & { email: string }).email,
    newToken,
  };
};

export default verifyTokens;
