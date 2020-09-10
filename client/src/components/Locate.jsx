import React from 'react'
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";

function Locate({ panTo }) {
    const options = {
        disableDefaultUI: true,
        zoomControl: true,
    };
    
    return (
      <button
        className="locate"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => null,
            options
          );
        }}
      >
        <LocationSearchingIcon />
      </button>
    );
  }

  export default Locate