import { useEffect, useState } from "react";
import Layout from "../components/layout";
import Carousel from "../components/carousel";
import ProductCard from "../components/product-card";
import { IProduct } from "../interfaces";
import SearchBar from "../components/searchbar";

export default function Home() {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const [products, setProducts] = useState<IProduct[]>([]);

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

        <SearchBar
          onSet={setProducts}
          searchPath="products/search/"
          defaultPath="products"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {products.map((item, key) => (
            <ProductCard item={item} key={"_home" + key} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
