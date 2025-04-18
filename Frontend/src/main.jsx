import React from "react";
import ReactDOM from "react-dom/client";  // ✅ Use createRoot
import { Provider } from "react-redux";
import store from "../Redux/store"
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
