import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { /*useEffect, useState*/ useRef } from "react";
import Layout from "../../components/layout";
import Image from "next/image";
// import Map from "../../components/map";
// import Marker from "../../components/marker";
import ProductCard from "../../components/product-card";

// TODO: allow revalidation when informations change
// TODO: make prety loading page or use blocking ?
// TODO: return 404 page when cant find producer on DB

interface IProducer {
    id: number;
    name: string;
    fantasyName: string;
    email: string;
    paymentMethods: [string];
    phones: [ string ];
    productionAddress : {
        street: string;
        codeId: string;
        district: string;
        cep: string;
        county: string; };
    productionRegion: string;
    negotiateOnProductionSite: boolean;
    businessAddress : {
        street: string;
        codeId: string;
        district: string;
        cep: string;
        county: string; };
    businessIsCollective: boolean;
    geoReferencedLocalization: { lat: number; lng: number; };
    affiliatedEntities: [ string ];
    cpfOrCnpj: string;
    licensed: boolean;
    certificationsAndRecords : [ string ];
    agroEcological: boolean;
    agroEcologicalCertifications : [ string ];
    organic: boolean;
    externalWebPages: [ string ];
    productionsClassification: [ string ];
};

const render = (status: Status) => {
    return <h1>{status}</h1>;
};


export default function ProducerAbout(props:any) {
    // const ref = useRef<HTMLDivElement>(null);
    const producer:IProducer = props.producer;
    const products = props.products || [];
    // const map = ref.current ? new window.google.maps.Map(ref.current, {}) : {};
    
    const center = {lat: -23.64161, lng: -46.73097};
    console.log('producer',producer && producer);
    console.log('products',products && products);

    return (    
        <Layout title={`${producer && producer.fantasyName} - Produtor`}>

            <p className="text-4xl font-bold text-center my-4 ">
                {producer && producer.fantasyName}
            </p>
            <div style={{ display: "flex", height: "200px" }} className="w-full h-48 relative">
                <Image
                    className="object-cover w-full h-96 rounded-none rounded-t-lg md:h-auto md:w-48"
                    src={`/home${producer && producer.id}.png`}
                    layout="fill"
                    alt={producer && producer.fantasyName}
                />
            </div>
            <p>
                <span className="font-bold">Responsável</span>: {producer && producer.name}
            </p>
            <p>
                <span className="font-bold">E-mail</span>:{" "}
                <a
                    href={`mailto:${producer && producer.email}`}
                    className="text-emerald-800 hover:underline active:text-emerald-600"
                >
                    {producer && producer.email}
                </a>
            </p>
            <p>
                <span className="font-bold">Métodos de Pagamento</span>: {producer && producer.paymentMethods.map((pa:string) => pa+", ")}
            </p>
            <div style={{ display: "flex", height: "200px" }}>
                {/* <Wrapper
                    apiKey={"AIzaSyCXGJse38b65vXJStGzFD3r7-CuC0TjPgk"}
                    // render={render}
                >
                    <Map
                        style={{ flexGrow: "1", height: "100%" }}
                        options={{ center: center, zoom: 17  }}
                    >
                        <Marker key="center" position={center} />
                    </Map>
                </Wrapper> */}
            </div>
            <p className="text-4xl font-bold text-center my-4">
                Confira nossos produtos!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                {products && products.map((item:any) => (
                    <ProductCard item = {item}/>
                ))}
            </div>
        </Layout>
    );
}

export async function getStaticPaths() {  
//     const res = await fetch(`http://localhost:3000/producers`);
//     const j = await res.json()
//     const producers = j.items;
//     // console.log('producers:', producers);
//     // Get the paths we want to pre-render based on producers
//     const paths = producers.map((producer:any) => ({
//       params: { id: producer.id.toString() },
//     }))
    return { paths:[], fallback: true }
}

export async function getStaticProps(context:any) {
    const resProducer = await fetch(`http://localhost:3000/producers/${context.params.id}`);
    const producerMessage = await resProducer.json()
    const producer:IProducer = producerMessage.item;
    // TODO: connect true routes
    const resProducts = await fetch(`http://localhost:3000/products`);
    const productsMessage = await resProducts.json()
    const products = productsMessage.items;
    return { props: {
        producer,
        products
      } }
}