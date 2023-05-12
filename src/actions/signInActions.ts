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
    console.log(err);
    return err;
  }
};
