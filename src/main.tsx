import React from "react";
import ReactDOM from "react-dom/client";
import { flushSync } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "@/app/App";
import { ThemeProvider } from "@/app/ThemeProvider";
import "@/styles/globals.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

flushSync(() => {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>,
  );
});
