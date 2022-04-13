import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Layout from "../../components/layout";
import ProductCard from "../../components/product-card";
import ProducerLoaded from "../../components/producer-loaded";
import { IProducer, IProduct } from "../../Interfaces/interfaces"
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import Marker from "../../components/marker";
import Map from "../../components/map";

// TODO: allow revalidation when informations change
// TODO: make prety loading page or use blocking ?
// TODO: return 404 page when cant find producer on DB

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
async function LoadProducer(id: number): Promise<IProducer> {
    try {
        const resp = await fetch(`${serverUrl}/producers/${id}`)
        const data = await resp.json()
        // console.log("data: ", data)
        console.log("LoadProducer fetch sucess", id)
        return data.items as IProducer
    } catch (error) {
        console.log("LoadpProducer error: ", error)
        throw error
    }
}
async function LoadProducts(id: number): Promise<IProduct[]> {
    try {
        const resp = await fetch(`${serverUrl}/producers/${id}/products`)
        const data = await resp.json()
        // console.log("data: ", data)
        console.log("LoadProducts fetch sucess", id)
        return data.items as IProduct[]
    } catch (error) {
        console.log("LoadProducts error: ", error)
        throw error
    }
}
const render = (status: Status) => {
    return <h1>{status}</h1>;
};
export default function ProducerAbout() {
    const router = useRouter()
    let id = Number(router.query.id)
    const [producer, setProducer] = useState<IProducer>({} as IProducer);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [center, setCenter] = useState<google.maps.LatLngLiteral>({lat:0,lng:0});
    // const ref = useRef<HTMLDivElement>(null);
    // const [map, setMap] = useState<google.maps.Map>();


    useEffect(() => {
        if (typeof id === 'number') {
            LoadProducer(id)
                .then((p) => {
                    setProducer(p)
                    // setCenter(p.coord)
                    // console.log("keys on useEffect", Object.keys(p))
                })
                .catch((err) => console.error("ProducerAbout() useEffect() LoadProducer() has failed", err))
            LoadProducts(id)
                .then((ps) => setProducts(ps))
                .catch((err) => console.error("ProducerAbout() useEffect() LoadProducts() has failed", err))
        }
    }, [id])

    // useEffect(() => {
    //     if (ref.current && !map) {
    //         setMap(new window.google.maps.Map(ref.current, {}));
    //     }
    // }, [ref, map]);
    return (
        <Layout title={`${producer.fantasyName} - Produtor`}>

            <ProducerLoaded item={producer && producer} />

            <div style={{ display: "flex", height: "200px" }}>
                <Wrapper
                    apiKey={"AIzaSyCXGJse38b65vXJStGzFD3r7-CuC0TjPgk"}
                    render={render}
                >
                    <Map 
                        style={{ flexGrow: "1", height: "100%" }}
                        options={{ center: center, zoom: 17 }}
                    >
                        <Marker key="center" position={center} />
                    </Map>
                </Wrapper>
            </div>

            <div className="container mx-auto p-4">
                <p className="text-4xl font-bold text-center my-4">
                    Conheça nossos produtos!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                    {products.map((item) => (
                        <ProductCard item={item} key={id && id + item.id} />
                    ))}
                </div>
            </div>

        </Layout>
    )
}