import React, {useReducer, createContext} from 'react'

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
  
  export const AppMapContext = createContext();
  
  const initialState = {
    expanded: false,
    mapOnItem: false,
    itemLatLng: {},
  }
  
  function MapContext({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    return (
      <AppMapContext.Provider
        value={{ state, dispatch }}
      >
        {children}
      </AppMapContext.Provider>
    );
  }

  export default MapContext