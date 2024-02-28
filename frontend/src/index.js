import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { FiltersProvider } from "./contexts/FiltersContext";
import {TopChartsProvider} from "./contexts/TopChartsContext"


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FiltersProvider>
      <TopChartsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TopChartsProvider>
    </FiltersProvider>
  </React.StrictMode>
);
