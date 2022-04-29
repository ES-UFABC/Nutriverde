import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { useEffect, useRef, useState } from "react";
import Layout from "../components/layout";
import Map from "../components/map";
import Marker from "../components/marker";

interface GeoPosition {
  lat: number;
  lng: number;
}
var pst: GeoPosition = {
  lat: -23.06,
  lng: -46.5,
};

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

export default function Maps() {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [zoom, setZoom] = useState(13);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>(pst);

  function getCoor(position: GeolocationPosition) {
    console.log(position.coords.latitude, position.coords.longitude);
    pst = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCenter(pst as google.maps.LatLngLiteral);
    console.log("geo location", pst);
  }
  function errorCoor(e: GeolocationPositionError) {
    console.log("could not get geometry location", e);
  }
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function () {},
        function () {},
        {}
      );
      navigator.geolocation.getCurrentPosition(getCoor, errorCoor, {
        maximumAge: 60000,
        timeout: 5000,
        enableHighAccuracy: true,
      });
      //   location = navigator.geolocation.getCurrentPosition(getPosition);
    } else {
      alert(
        "I'm sorry, but geolocation services are not supported by your browser."
      );
    }
  });

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  return (
    <Layout title="Mapa">
      <div style={{ display: "flex", height: "400px" }}>
        <Wrapper
          apiKey={"AIzaSyCXGJse38b65vXJStGzFD3r7-CuC0TjPgk"}
          render={render}
        >
          <Map
            style={{ flexGrow: "1", height: "100%" }}
            options={{ center: center, zoom: zoom }}
          >
            <Marker key="center" position={center} />
          </Map>
        </Wrapper>
      </div>
    </Layout>
  );
}
