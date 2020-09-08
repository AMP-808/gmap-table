import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";

//import {formatRelative} from 'date-fns'
// import "@reach/combobox/styles.css"
require("dotenv").config();

const libraries = ["places"];
const center = {
  lat: 39.8283,
  lng: -98.5795,
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Map(props) {
  const [selected, setSelected] = React.useState(null);
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyC8vjNCOlmexV02HRdjf_bGBRPWVmmx8s8",
    libraries,
  });

  //rerender the map on window resize from: https://www.pluralsight.com/guides/re-render-react-component-on-window-resize

  function debounce(fn, ms) {
    let timer;
    return (_) => {
      clearTimeout(timer);
      timer = setTimeout((_) => {
        timer = null;
        fn.apply(this, arguments);
      }, ms);
    };
  }

  const [dimensions, setDimensions] = React.useState({
    maxWidth: "950px",
    width: `${window.innerWidth - 50}px`, //'95vw',
    height: "500px",
  });

  React.useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        maxWidth: "950px",
        width: `${window.innerWidth - 50}px`, //'95vw',
        height: "500px",
      });
    }, 1000);

    window.addEventListener("resize", debouncedHandleResize);

    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(10);
  }, []);

  if (loadError) return "Error loading Maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <Search panTo={panTo} />
      <Locate panTo={panTo} />
      <GoogleMap
        mapContainerStyle={dimensions}
        zoom={4}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {props.data.map((marker) => (
          <Marker
            position={{
              lat: marker.coordinates.lat,
              lng: marker.coordinates.lng,
            }}
            onClick={() => {
              setSelected(marker);
            }}
          ></Marker>
        ))}
        {selected ? (
          <InfoWindow
            position={{
              lat: selected.coordinates.lat,
              lng: selected.coordinates.lng,
            }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div style={{ textAlign: "left" }}>
              <h3>{selected.company_name}</h3>
              <p>{selected.address}</p>
              <a
                href={selected.link_to_apply}
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply
              </a>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}

function Locate({ panTo }) {
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
      <PersonPinCircleIcon />
    </button>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 39.8283, lng: () => -98.5795 },
      radius: 2000 * 1000,
    },
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Enter an address"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
