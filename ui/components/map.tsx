import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import { createCustomEqual } from "fast-equals";
import React, {
  Children,
  cloneElement,
  EffectCallback,
  isValidElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { IProducer } from "../Interfaces";

const deepCompareEqualsForMaps = createCustomEqual(
  (deepEqual) => (a: any, b: any) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    // TODO extend to other types

    // use fast-equals for other objects
    return deepEqual(a, b);
  }
);

function useDeepCompareMemoize(value: any) {
  const ref = useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback: EffectCallback,
  dependencies: any[]
) {
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
}






export default function Map({
  onClick,
  onIdle,
  children,
  style,
  options,
}: {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children: ReactNode;
  options: google.maps.MapOptions;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [producers, setProducers] = useState<IProducer[]>([]);
  let infoWindow = new google.maps.InfoWindow();

  useEffect(() => {
    fetch("http://localhost:3000/producers")
      .then(async (response) => {
        const data = await response.json();
        console.log("data: ", data);
        setProducers(data.items);
        //getLatLng(data.items)
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }, []);


  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }

  }, [ref, map]);

  useEffect(() => {
    showMarkers()
    console.log("tentei")
  }, [producers])
  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);


  useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  function showMarkers() {
    producers.map((item) => {

      const marker = new window.google.maps.Marker({
        position: item.geoReferencedLocalization
      });
      marker.addListener("click", () => {
        // selectedLocation = location;
        infoWindow.setContent(
          `<div className='flex flex-col content-start p-2'>` +
          `<h2 className='font-semibold text-lg mb-2'>` +
            `<a
            href=/producers/`
            + `${item.id && item.id!}` +
              ` className="text-emerald-800 hover:underline active:text-emerald-600"
            >` + `${item.fantasyName}` + `</a>`+
          `</h2>` +
          `<p>${item.businessAddress.street}</p>` +

          `<a
            href=https://`
          + `${item.externalWebPages && item.externalWebPages!}` +
          ` className="text-emerald-800 hover:underline active:text-emerald-600"
        >` + `${item.externalWebPages && item.externalWebPages!}
        </a>`
      

        );

        infoWindow.open({
          anchor: marker,
          map,
          shouldFocus: true
        });
      });

      marker.setMap(map);
    });
  };



  return (
    <>
      <div ref={ref} style={style} />
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          // set the map prop on the child component
          return cloneElement(child, { map });
        }
      })}
    </>
  );
}
function item(item: any) {
  throw new Error("Function not implemented.");
}

