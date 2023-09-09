import jwt from 'jsonwebtoken';

import redisClient from '../config/redisClient';

const createToken = async (email: string) => {
   const verifyToken = jwt.sign(
      { email: email },
      process.env.JWT_VERIFY_SECRET,
      {
         expiresIn: '15m',
      },
   );
   const refreshToken = jwt.sign(
      { email: email },
      process.env.JWT_REFRESH_SECRET,
   );

   try {
      await redisClient.connect();

      await redisClient.sAdd(process.env.REDIS_TOKEN_KEY, refreshToken);

      await redisClient.disconnect();
   } catch (err) {
      console.log(err);
   }

   return {
      verifyToken: `Bearer ${verifyToken}`,
      refreshToken: `Bearer ${refreshToken}`,
   };
};

export default createToken;
