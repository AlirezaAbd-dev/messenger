import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useTokenCheck = () => {
  const [tokens, setTokens] = useState<{
    verifyToken?: string;
    refreshToken?: string;
  }>();

  const router = useRouter();

  useEffect(() => {
    setTokens({
      verifyToken: localStorage.getItem("verify-token") || undefined,
      refreshToken: localStorage.getItem("refresh-token") || undefined,
    });
  }, []);

  if (!tokens?.verifyToken || !tokens?.refreshToken) {
    router.replace("/signIn");
  }

  return tokens;
};

export default useTokenCheck;
