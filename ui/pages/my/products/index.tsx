import { PlusIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../../../components/layout";
import ProductCard from "../../../components/product-card";

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

export default function MyProducts() {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const [products, setProducts] = useState<IProducts[]>([]);
  const user = 1;

  useEffect(() => {
    fetch(`${serverUrl}/producers/${user}/products`)
      .then(async (response) => {
        const data = await response.json();
        setProducts(data.items);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }, []);

  return (
    <Layout title="Home">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row items-center">
          <Link href={"/my/products/create"}>
            <a className="w-full btn btn-primary md:w-40 md:w-40 md:order-3">
              <PlusIcon className="block h-6 w-6" />
              Adicionar
            </a>
          </Link>

          <p className="grow text-4xl font-bold text-center my-4 md:order-2">
            Seus produtos
          </p>

          {/* Phantom container, just to center the text correctly */}
          <div className="w-40 md:order-1"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {products.map((item) => (
            <ProductCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
