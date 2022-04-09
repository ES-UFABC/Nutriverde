import { useEffect, useState } from "react";
import Layout from "../components/layout";
import Image from "next/image";
import Carousel from "../components/carousel";
import { SearchIcon } from "@heroicons/react/outline";
import NumberFormat from "react-number-format";
import Link from "next/link";

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
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const [products, setProducts] = useState<IProducts[]>([]);

  async function submit(e: any) {
    try {
      e.preventDefault();

      const search = e.target.s.value;
      const path = search ? `products/search/${search}` : "products";
      const res = await fetch(`${serverUrl}/${path}`);
      const resJson = await res.json();
      setProducts(resJson.items);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetch(`${serverUrl}/products`)
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
            <Link key={item.id} href={`/products/${item.id}`}>
              <a className="flex flex-col items-center bg-white rounded-lg border shadow-md hover:bg-gray-100">
                <div className="flex w-full h-full relative justify-center">
                  <Image
                    className="object-cover w-full h-96 rounded-none rounded-t-lg"
                    src="/placeholder.png"
                    width={125}
                    height={125}
                    alt={item.name}
                  />
                </div>
                <div className="flex flex-col justify-between px-4 py-2 leading-normal w-full">
                  <div className="flex flex-row justify-between">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                      {item.name}
                    </h5>
                    <p>
                      <NumberFormat
                        className="font-bold text-emerald-800 text-2xl"
                        value={item.price}
                        displayType="text"
                        prefix="R$"
                        decimalSeparator=","
                        thousandSeparator="."
                        decimalScale={2}
                        fixedDecimalScale
                      />{" "}
                      <span>cada {item.unitOfMeas}</span>
                    </p>
                  </div>
                  <hr className="mb-2 w-full" />
                  <p>
                    <span className="font-bold">Tipologia</span>:{" "}
                    {item.typology}
                  </p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
