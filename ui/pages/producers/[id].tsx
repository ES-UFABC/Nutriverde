// import { Status, Wrapper } from "@googlemaps/react-wrapper";
// import { useEffect, useState, useRef } from "react";
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
    coord: { lat: number; lng: number; };
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
interface IProducts {
    id: number;
    name: string;
    unitOfMeas: string;
    typology: string;
    price: number;
    specialDeliveryConditions: string;
    quantity: number;
    cover: string;
}
// const render = (status: Status) => {
//     return <h1>{status}</h1>;
// };

export default function ProducerAbout(props:any) {
    console.log("props",props)
    // const ref = useRef<HTMLDivElement>(null);

    // const producer:IProducer = props.producer || {  paymentMethods:[],
    //                                                 phones:[],
    //                                                 affiliatedEntities :[],
    //                                                 certificationsAndRecords :[],
    //                                                 agroEcologicalCertifications :[],
    //                                                 externalWebPages :[],
    //                                                 productionsClassification:[]
    //                                             };

    // const [producer, setProducer] = useState<IProducer>();
    // const [products, setProducts] = useState<IProducts[]>([]);
    // const products = props.products || [];
    // const map = ref.current ? new window.google.maps.Map(ref.current, {}) : {};
    
    // const center = {lat: -23.64161, lng: -46.73097};
    // const center = producer.coord || {lat:-23.06, lng:-46.5};
    //  console.log('producer',producer && producer);
    //  console.log('products',products && products);


    // useEffect(() => {
    //     const path = `producers/${props.params.id}`;
    //     fetch(`http://localhost:3000/${path}`)
    //     .then(async (response) => {
    //       const data = await response.json();
    //       console.log("data: ", data);
    //       setProducer(data.item);
    //     })
    //     .catch((err) => {
    //       console.log("error: ", err);
    //     });
    //     fetch(`http://localhost:3000/${path}/products`)
    //     .then(async (response) => {
    //       const data = await response.json();
    //       console.log("data: ", data);
    //       setProducts(data.items);
    //     })
    //     .catch((err) => {
    //       console.log("error: ", err);
    //     });
    // }, [])
    // const center = producer.coord || {lat:-23.06, lng:-46.5};

    return (    
        <Layout title={`${/*producer.fantasyName*/""} - Produtor`}>

            {/* <p className="text-4xl font-bold text-center my-4 ">
                {producer.fantasyName}
            </p>
            <div style={{ display: "flex", height: "200px" }} className="w-full h-48 relative">
                <Image
                    className="object-cover w-full h-96 rounded-none rounded-t-lg md:h-auto md:w-48"
                    src={`/home${producer.id}.png`}
                    layout="fill"
                    alt={producer.fantasyName}
                />
            </div> */}
            {/* <p>
                <p><span className="font-bold">Responsável</span>: {producer.name}
            </p>
            <p>
                <p><span className="font-bold">E-mail</span>:{" "}
                <a
                    href={`mailto:${producer.email}`}
                    className="text-emerald-800 hover:underline active:text-emerald-600"
                >
                    {producer.email}
                </a>
            </p>
            <p>
                <p><span className="font-bold">Métodos de Pagamento</span>: {producer.paymentMethods && producer.paymentMethods.map((pa:string) => pa+", ")}
            </p> */}
            
            {/* <div className="">
                <p><span className="font-bold">Responsável</span>: {producer.name}</p>
                <p><span className="font-bold">E-mail</span>: {" "}
                <a
                    href={`mailto:${producer.email}`}
                    className="text-emerald-800 hover:underline active:text-emerald-600"
                >
                    {producer.email}
                </a></p>
                <p><span className="font-bold">Métodos de Pagamento</span>: 
                {producer.paymentMethods.length<1?"nenhum":producer.paymentMethods.map(doc => " '"+doc+"'")}</p>
                <p><span className="font-bold">Telefones</span>: {producer.phones&&producer.phones.length<1?"nenhum":producer.phones.map(doc => ' '+doc+' ')}</p>
                <p><span className="font-bold">Responsável</span>: {producer.productionAddress}
                <p><span className="font-bold">Comunidade ou Região de Produção</span>: {producer.productionRegion}</p>
                <p><span className="font-bold">Atente no endereço de produção</span>: {producer.negotiateOnProductionSite===true?"sim":"não"}</p>
                <p><span className="font-bold">Responsável</span>: {producer.businessAddress}
                <p><span className="font-bold">Tipo de Produtor</span>: {producer.businessIsCollective===true?"Coletivo":"Individual"}</p>
                <p><span className="font-bold">Cadastrado em Entidades</span>: 
                    {producer.affiliatedEntities.length<1?"nenhuma":
                        producer.affiliatedEntities.map(doc => ' "'+doc+'"')}</p>
                <p><span className="font-bold">Documento(CPF ou CNPJ)</span>: {producer.cpfOrCnpj}</p>
                <p><span className="font-bold">Produtor licenciado?</span>: {producer.licensed===true?"sim":"não"}</p>
            </div> */}


            {/* <div className="">
                <p><span className="font-bold">Registros ou Certificações</span>:
                    {producer.certificationsAndRecords.length<1?"nenhum":
                        producer.certificationsAndRecords.map(doc => ' "'+doc+'"')}</p>
                <p><span className="font-bold">Produtor Agroecológico</span>: {producer.agroEcological===true?"sim":"não"}</p>
                <p><span className="font-bold">Certificações Agroecológicas</span>:
                    {producer.agroEcologicalCertifications.length<1?"nenhuma":
                        producer.agroEcologicalCertifications.map(doc => ' "'+doc+'"')}</p>
                <p><span className="font-bold">Produtor de Organicos</span>: {producer.organic===true?"sim":"não"}</p>
                <p><span className="font-bold">Paginas Externas</span>: 
                    {producer.externalWebPages.map(webLink => (
                        <a
                            href={`${webLink}`}
                            className="text-emerald-800 hover:underline active:text-emerald-600"
                        >
                            {" "}{webLink}
                        </a>
                    ))}</p>
                <p><span className="font-bold">Tipos de Produção</span>: 
                    {producer.productionsClassification.length<1?"nenhuma":
                        producer.productionsClassification.map(doc => ' "'+doc+'"')}</p>
            </div> */}


            {/* <div style={{ display: "flex", height: "200px" }}> 
                <Wrapper
                    apiKey={"AIzaSyCXGJse38b65vXJStGzFD3r7-CuC0TjPgk"}
                    // render={render}
                >
                    <Map
                        style={{ flexGrow: "1", height: "100%" }}
                        options={{ center: center, zoom: 17  }}
                    >
                        <Marker key="center" position={center} />
                    </Map>
                </Wrapper>
            </div> */}
            {/* <p className="text-4xl font-bold text-center my-4">
                Confira nossos produtos!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                {products.map((item:any) => (
                    <ProductCard item = {item} key={item.id}/>
                ))}
            </div> */}
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
    //  console.log("Chamei",context)
    // const path = `producers/${context.params.id}`;
    // const resProducer = await fetch(`http://localhost:3000/${path}`);
    // const producerMessage = await resProducer.json()
    // console.log("producerMessage",producerMessage)
    // const producer:IProducer = producerMessage.item;
    // console.log(producer)
    // const resProducts = await fetch(`http://localhost:3000/${path}/products`);
    // const productsMessage = await resProducts.json()
    // console.log("productsMessage",productsMessage)
    // const products = productsMessage.items;
    // console.log("products",products)
    return { props: {
        // producer,
        // products
      } }
}
