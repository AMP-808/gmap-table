import React from "react";
import "./App.css";
//import DataTableContainer from './components/dataTableContainer';
//import MaterialDataTable from './components/materialDataTable';
//import EnhancedTable from './components/materialSortableTable';
import AiropsTable from "./components/material-table";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 id="Logo">
          <img src="fapa-logo.png" alt="Fapa logo"></img>
        </h1>
      </header>
      <AiropsTable />
      {/* <Map /> */}
      {/* <EnhancedTable/> */}
      {/* <MaterialDataTable/> */}
      {/* <DataTableContainer /> */}
      {/* <OperatorsTable /> */}
    </div>
  );
}

export default App;
