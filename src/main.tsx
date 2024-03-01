import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { ThemeProvider } from "@/components/theme-provider";
import { AppRoutes } from "@/routes";
import { store } from "@/redux/store";

import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="default" storageKey="chirpify-ui-theme">
        <AppRoutes />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
