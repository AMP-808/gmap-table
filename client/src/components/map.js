import React from "react";
import Search from './Search'
import Locate from './Locate'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import "@reach/combobox/styles.css";
import { AppMapContext } from "../contexts/MapContext";

const libraries = ["places"];

const center = {
  lat: 39.8283,
  lng: -98.5795,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

function Map(props) {
  const [selected, setSelected] = React.useState(null);
  const { state: { mapOnItem, itemLatLng }, dispatch } = React.useContext(AppMapContext);
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  console.log(mapRef)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "",
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

  mapOnItem && panTo(itemLatLng);

  if (loadError) return "Error loading Maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <Search panTo={panTo} />

      <GoogleMap
        mapContainerStyle={dimensions}
        zoom={4}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        <Locate panTo={panTo} />
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

export default Map;
