import { useEffect, useState } from "react";
import Layout from "../components/layout";
import Carousel from "../components/carousel";
import { SearchIcon } from "@heroicons/react/outline";
import ProductCard from "../components/product-card";

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

export default function Home() {
  const [products, setProducts] = useState<IProducts[]>([]);

  async function submit(e: any) {
    try {
      e.preventDefault();

      const search = e.target.s.value;
      const path = search ? `products/search/${search}` : "products";
      const res = await fetch(`http://localhost:3000/${path}`);
      const resJson = await res.json();
      setProducts(resJson.items);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetch("http://localhost:3000/products")
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
    <Layout title="Home">
      <Carousel sources={["/slide1.jpg"]} />

      <div className="container mx-auto p-4">
        <p className="text-4xl font-bold text-center my-4">
          Veja nossos produtos!
        </p>
        {/* TODO: criar componente para busca */}
        <form className="pb-4" onSubmit={submit}>
          <div className="flex">
            <input
              type="text"
              id="search"
              name="s"
              className="block p-4 text-md rounded-none rounded-l-lg bg-gray-50 border border-emerald-800 text-gray-900 focus:z-10 focus:ring-emerald-900 focus:border-emerald-900 block flex-1 min-w-0 w-full border-emerald-800"
              placeholder="Procure por produtos..."
            />
            <button
              className="inline-flex items-center px-4 text-md text-white bg-emerald-800 rounded-r-lg border border-l-0 border-emerald-800 hover:bg-emerald-700 focus:z-10 focus:ring-4 focus:ring-emerald-900"
              type="submit"
            >
              <SearchIcon className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {products.map((item) => (
            <ProductCard item = {item}/>
          ))}
        </div>
      </div>
    </Layout>
  );
}
