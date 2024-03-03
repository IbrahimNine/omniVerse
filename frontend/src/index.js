import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { FiltersProvider } from "./contexts/FiltersContext";
import { ArtistContextProvider } from "./contexts/ArtistContext";
import { ReleaseProvider } from "./contexts/ReleaseContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FiltersProvider>
      <ArtistContextProvider>
        <ReleaseProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ReleaseProvider>
      </ArtistContextProvider>
    </FiltersProvider>
   </React.StrictMode>
);
