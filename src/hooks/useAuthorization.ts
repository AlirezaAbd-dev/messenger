import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useAuthorization = () => {
  const router = useRouter();

  useEffect(() => {
    if (
      !localStorage.getItem("verify-token") ||
      !localStorage.getItem("refresh-token")
    ) {
      return router.replace("/signIn");
    }
  }, [router]);
};

export default useAuthorization;
