import { BrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import { FC } from "react";
import { Loading } from "@/components/loading";

const ChatRoutes: FC = lazy(() => import("./chat.routes"));
const AuthRoutes: FC = lazy(() => import("./auth.routes"));

export const AppRoutes: FC = () => {
  let user
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        {user ? <ChatRoutes /> : <AuthRoutes />}
      </Suspense>
    </BrowserRouter>
  );
};
