// global font css theme for mui components:
import { ThemeProvider } from "@emotion/react";
import "notyf/notyf.min.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Components/LayoutArea/Layout/Layout";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import interceptors from "./Utils/Interceptors";
import muiGlobalFontTheme from "./Utils/MuiGlobalFontTheme";

// Register interceptors:
// check any request from db - if contains the necessary permissions:
interceptors.create();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
  {/* set global font for mui elements to override it's default: */}
    <ThemeProvider theme={muiGlobalFontTheme}>
      <Layout />
    </ThemeProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
