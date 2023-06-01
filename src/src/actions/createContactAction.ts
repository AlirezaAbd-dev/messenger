"use server";

import axios, { AxiosResponse } from "axios";

import { Contact } from "../zustand/contactsStore";

export default async function createContactAction(
  name: string,
  email: string,
  tokens: { verifyToken: string; refreshToken: string }
) {
  return await axios
    .post<any, AxiosResponse<Contact>>(
      process.env.API_URL + "/contact",
      { name, email },
      {
        headers: {
          "x-auth-token": tokens.verifyToken,
          "x-refresh-token": tokens.refreshToken,
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err.response.data.message);
    });
}
