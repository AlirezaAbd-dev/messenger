import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useTokenCheck = () => {
  const router = useRouter();

  useEffect(() => {
    if (
      !localStorage.getItem("verify-token") ||
      !localStorage.getItem("refresh-token")
    ) {
      router.replace("/signIn");
    }
  }, [router]);
};

export default useTokenCheck;
