import React from 'react';
import './App.css';
//import DataTableContainer from './components/dataTableContainer';
//import MaterialDataTable from './components/materialDataTable';
//import EnhancedTable from './components/materialSortableTable';
import MaterialTable from './components/material-table';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 id='Logo'>FAPA.aero</h1>
      </header>
      <MaterialTable/>
      {/* <Map /> */}
      {/* <EnhancedTable/> */}
      {/* <MaterialDataTable/> */}
      {/* <DataTableContainer /> */}
      {/* <OperatorsTable /> */}
    </div>
  );
}

export default App;
