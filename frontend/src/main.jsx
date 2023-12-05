import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RecoilRoot } from "recoil";
import "bootstrap/dist/css/bootstrap.min.css";
import { CssVarsProvider } from "@mui/joy";
// import { extendTheme } from "@mui/joy/styles";

// Then, pass it to `<CssVarsProvider theme={theme}>`.

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <CssVarsProvider defaultMode="dark">
        <App />
      </CssVarsProvider>
    </RecoilRoot>
  </React.StrictMode>
);
