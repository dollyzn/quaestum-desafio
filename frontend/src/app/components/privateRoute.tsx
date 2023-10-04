import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "@/redux/authSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.user !== null
  );
  const [authenticationCompleted, setAuthenticationCompleted] =
    useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        const resultAction = await dispatch(refreshToken());

        if (refreshToken.fulfilled.match(resultAction)) {
          setAuthenticationCompleted(true);
        } else if (refreshToken.rejected.match(resultAction)) {
          toast.warning("Sessão expirada", { theme: "dark" });
          router.push("/login");
        }
      } else {
        setAuthenticationCompleted(true);
      }
    };

    checkAuth();
  }, []);

  if (authenticationCompleted) {
    return children;
  }
  return null;
};

export default PrivateRoute;
