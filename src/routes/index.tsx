import { FC, Suspense, lazy, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Loading } from "@/components/loading";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { login, selectAuth } from "@/redux/user/slice";
import { api } from "@/services/api";

const ChatRoutes: FC = lazy(() => import("./chat.routes"));
const AuthRoutes: FC = lazy(() => import("./auth.routes"));

export const AppRoutes: FC = () => {
  const user = useAppSelector(selectAuth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = localStorage.getItem("@Chirpify:user");
    const token = localStorage.getItem("@Chirpify:token");

    if (user && token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      dispatch(login({ user: JSON.parse(user), token }));
    }
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        {user ? <ChatRoutes /> : <AuthRoutes />}
      </Suspense>
    </BrowserRouter>
  );
};
