
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

export default function Producers() {
  const [producers, setProducts] = useState<IProducer[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/producers")
      .then(async (response) => {
        const data = await response.json();
        console.log("data: ", data);
        setProducts(data.items);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }, []);

  return (
    <Layout title="Produtores">
      <div className="container mx-auto p-4">
        <p className="text-4xl font-bold text-center my-4">
          Conheça nossos parceiros!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {producers.map((item) => (
            <ProducerCard item = {item}/>
          ))}
        </div>
      </div>
    </Layout>
  );
}
