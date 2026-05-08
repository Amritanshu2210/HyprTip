import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AdminPage from "./AdminPage";
import RefundPolicyPage from "./components/RefundPolicyPage";
import TermsAndConditionsPage from "./components/TermsAndConditionsPage";
import "../style.css";

const path = window.location.pathname.replace(/\/$/, "");
const isAdminRoute = path.startsWith("/admin");

let RootComponent = App;
if (isAdminRoute) {
  RootComponent = AdminPage;
} else if (path === "/refund-policy") {
  RootComponent = RefundPolicyPage;
} else if (path === "/terms-and-conditions") {
  RootComponent = TermsAndConditionsPage;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>
);
