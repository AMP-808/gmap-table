import React from "react";
import "./App.css";

import AiropsTable from "./components/material-table";

const reducer = (state, action) => {
  switch (action.type) {
    case "openInMap":
      return {
        ...state,
        expanded: true,
        mapOnItem: true,
        itemLatLng: action.data.coordinates,
      };
    case "reset":
      return {
        ...state,
        mapOnItem: false,
        itemLatLng: {},
      };
    case "toggleExpanded":
      return {
        ...state,
        expanded: !state.expanded,
      };
    default:
      throw new Error("Don't undertand action");
  }
};

export const MyContext = React.createContext();

function MyProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, {
    expanded: false,
    mapOnItem: false,
    itemLatLng: {},
  });

  const { expanded, mapOnItem, itemLatLng } = state;

  const panMap = (data) => {
    dispatch({ type: "openInMap", data });
  };

  const toggleExpanded = () => {
    dispatch({ type: "toggleExpanded" });
  };

  return (
    <MyContext.Provider
      value={{ expanded, mapOnItem, itemLatLng, panMap, toggleExpanded }}
    >
      {children}
    </MyContext.Provider>
  );
}

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

export default () => {
  return (
    <MyProvider>
      <App />
    </MyProvider>
  );
};
