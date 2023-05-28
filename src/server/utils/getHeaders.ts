const getHeaders = (headers: Headers) => {
  if (!headers.get("x-auth-token") || !headers.get("x-refresh-token")) {
    throw new Error("شما اجازه دسترسی ندارید!");
  } else {
    return headers;
  }
};

export default getHeaders;
