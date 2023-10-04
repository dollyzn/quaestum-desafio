import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { RootState } from "@/redux/store";

const RestrictedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  const [allowed, setAllowed] = useState(true);

  useEffect(() => {
    if (user && user.profile === "user") {
      setAllowed(false);
      router.push("/");
      toast.warning("Parece que você não pode entrar aqui", {
        theme: "dark",
      });
    }
  }, [user, router]);

  if (allowed) {
    return children;
  }

  return null;
};

export default RestrictedRoute;
