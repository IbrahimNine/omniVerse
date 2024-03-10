import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { FiltersProvider } from "./contexts/FiltersContext";
import { ArtistContextProvider } from "./contexts/ArtistContext";
import { ReleaseProvider } from "./contexts/ReleaseContext";
import { AuthContextProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {" "}
    <BrowserRouter>
      <AuthContextProvider>
        <FiltersProvider>
          <ArtistContextProvider>
            <ReleaseProvider>
              <App />
            </ReleaseProvider>
          </ArtistContextProvider>
        </FiltersProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
