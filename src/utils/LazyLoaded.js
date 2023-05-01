import React from "react";

export const Login = React.lazy(() => import("../containers/Auth/Login"));
export const Home = React.lazy(() => import("../containers/Home/Home"));
export const Email = React.lazy(() => import("../containers/Email/Email"));
export const Sms = React.lazy(() =>
  import("../containers/SmsEditor/SmsEditor")
);
export const Push = React.lazy(() =>
  import("../containers/PushEditor/PushEditor")
);
export const NotFound = React.lazy(() =>
  import("../components/NotFound/NotFound")
);
