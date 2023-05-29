"use server";

import { Contact } from "@/zustand/contactsStore";
import axios, { AxiosResponse } from "axios";

const getContactsAction = async (token: string, refreshToken: string) => {
  const result = await axios.get<any, AxiosResponse<Contact[]>>(
    process.env.API_URL + "/contact",
    {
      headers: {
        "x-auth-token": token,
        "x-refresh-token": refreshToken,
      },
    }
  );
  return result.data.sort((a, b) => a.name.localeCompare(b.name));
};

export default getContactsAction;
