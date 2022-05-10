import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import ProducerCard from "../../components/producer-card";
import { IProducer } from "../../interfaces";

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

  async function submit(e: any) {
    try {
      e.preventDefault();

      const search = e.target.s.value;
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Fetch PUT Request Example" }),
      };
      const path = search ? `products/search/${search}` : "products";
      const res = await fetch(`http://localhost:3000/${path}`);
      const resJson = await res.json();
      setProducts(resJson.items);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Layout title="Produtores">
      <div className="container mx-auto p-4">
        <a
          className="text-white bg-emerald-800 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          href="/register"
        >
          Venha fazer parte da comunidade NutriVerde
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
            className="w-5 h-5 ml-2 -mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </a>

        <p className="text-4xl font-bold text-center my-4">
          Conheça nossos parceiros!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {producers.map((item) => (
            <ProducerCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
