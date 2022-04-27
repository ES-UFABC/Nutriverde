import { PlusIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../../../components/layout";
import ProductCard from "../../../components/product-card";
import * as Auth from "../../../services/auth"
import { IProduct } from "../../../Interfaces"
import router from "next/router";
import Login from "../../login";


export default function MyProducts() {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isProducer, setIsProducer] = useState(false);

  var token: any
  if (typeof window !== 'undefined') {
    token = Auth.getToken()
    if(!token){
      router.push({
        pathname: '/login' // autenticado
      });
    }
  }


  const requestOptions = {
    method: 'GET',
    headers: { 'x-auth-token': `${token}` }
  };

  useEffect(() => { // TODO: handler with no Data
    fetch(`${serverUrl}/producers/products`, requestOptions)
      .then(async (response) => {
        const data = await response.json();
        console.log(data)
        setProducts(data.items);
        setIsProducer(data.isProducer); // Sou Produtor ? 
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }, []);

  /**
   * @Test
   * @returns 
   */
  function listProducts() {
    let render;
    if (products) {
      render = products.map((item) => (
        <ProductCard item={item} key={item.id} />
      ))
    } else {
      render = <span>Nenhum Produto Cadastrado.</span>
    }
    return render
  }

  function condRender() {
    let render;
    if (isProducer) {
      render = (
        <Layout title="">
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
              {listProducts()}
            </div>
          </div>
        </Layout>)
    }
    else {
      render = <p>Voce não possui permissoes para isso</p>

    }
    return render
  }

  return (
    <>
      {condRender()}
    </>
  );
}
