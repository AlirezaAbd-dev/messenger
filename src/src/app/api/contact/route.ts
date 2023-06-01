import getHeaders from "@/server/utils/getHeaders";
import verifyTokens from "@/server/utils/verifyTokens";
import { NextRequest, NextResponse as res } from "next/server";

export { default as POST } from "@/server/controller/contact/addContact";
export { default as GET } from "@/server/controller/contact/getAllContacts";

export const DELETE = async (req: NextRequest) => {
  // Getting headers
  let headers: Headers;
  try {
    headers = getHeaders(req.headers);
  } catch (err: any) {
    return res.json({ message: err.message }, { status: 401 });
  }

  //   Verifying tokens
  const tokenData = await verifyTokens(headers);
  if (tokenData.error) {
    return res.json(
      {
        message: tokenData.error,
      },
      { status: 401 }
    );
  }
};
