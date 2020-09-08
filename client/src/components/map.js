import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
//import {formatRelative} from 'date-fns'
// import "@reach/combobox/styles.css"
require("dotenv").config();

const libraries = ["places"];
const center = {
  lat: 21.306944,
  lng: -157.858337,
};
const options = {
  /* disableDefaulUI: true,
    zoomControl: true */
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

  //rerender the map on window resize from: https://www.pluralsight.com/guides/re-render-react-component-on-window-resize
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

  if (loadError) return "Error loading Maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      {/* <h1>FAPA.aero</h1> */}
      <GoogleMap
        mapContainerStyle={dimensions}
        zoom={8}
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
              <a href={selected.link_to_apply} target="_blank">
                Apply
              </a>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}
