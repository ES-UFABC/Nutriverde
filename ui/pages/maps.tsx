import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { useEffect, useRef, useState } from "react";
import Layout from "../components/layout";
import Map from "../components/map";
import Marker from "../components/marker";

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

export default function Maps() {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [zoom, setZoom] = useState(10);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: -23.06,
    lng: -46.5,
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
