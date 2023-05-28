"use server";
import axios from "axios";

export const sendEmailAction = async (email: string) => {
  try {
    const response = await axios.post("http://localhost:3000/api/signIn", {
      email,
    });
    if (response.status === 200) {
      return response.data.message;
    }
  } catch (err: any) {
    throw new Error(String(err.response.data.message));
  }
};

export const signInAction = async (email: string, OTP: number) => {
  console.log("signing in...");
  try {
    const response = await axios.put("http://localhost:3000/api/signIn", {
      email,
      OTP,
    });

    if (response.status === (200 || 201)) {
      return {
        message: response.data.message,
        verifyToken: response.headers["x-auth-token"],
        refreshToken: response.headers["x-refresh-token"],
      };
    }
  } catch (err: any) {
    console.log(err);
    throw new Error(String(err.response.data.message));
  }
};
