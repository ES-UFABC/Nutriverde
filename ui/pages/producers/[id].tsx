import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import ProducerCard from "../../components/producer-card";

interface IProducer {
  id: number;
  name: string;
  fantasyName: string;
  email: string;
  paymentMethods: string;
}

export default function ProducerAbout(props:any) {
    const producer = props.producer;

    return (
        <Layout title={`Produtor ${producer.name}`}>
        <div className="container mx-auto p-4">
            <p className="text-4xl font-bold text-center my-4">
            Conheça nosso parceiro!
            </p>
            {producer.name}

            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {producers.map((item) => (
                <ProducerCard item = {item}/>
            ))}
            </div> */}
        </div>
        </Layout>
    );
}

export async function getStaticPaths() {
    
    const res = await fetch(`http://localhost:3000/producers`);
    const j = await res.json()
    const producers = j.items;
    // console.log('producers:', producers);
    // Get the paths we want to pre-render based on producers
    const paths = producers.map((producer:any) => ({
      params: { id: producer.id.toString() },
    }))
  
    return { paths, fallback: true }
}

export async function getStaticProps(context:any) {
    const res = await fetch(`http://localhost:3000/producers/${context.params.id}`);
    const j = await res.json()
    const producer = j.item;
    return {
      props: {
        producer,
      },
    }
  }