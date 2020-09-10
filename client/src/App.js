import React from "react";
import AiropsTable from "./components/material-table";
import "./css/App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 id="Logo">
          <img src="fapa-logo.png" alt="Fapa logo"></img>
        </h1>
      </header>
      <AiropsTable />
    </div>
  );
}

export default App