import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from "./components/theme-provider";
import { AppRoutes } from "./routes";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="chirpify-ui-theme">
        <AppRoutes />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
