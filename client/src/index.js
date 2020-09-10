import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import MapContext from './contexts/MapContext'
import "./css/index.css";


ReactDOM.render(
  <React.StrictMode>
    <MapContext>
      <App />
    </MapContext>
  </React.StrictMode>,
  document.getElementById("root")
);
