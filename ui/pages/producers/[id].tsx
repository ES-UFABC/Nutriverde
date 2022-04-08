import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { ArrowRightIcon } from "@heroicons/react/outline";
import { useRouter } from 'next/router'


interface IProducer {
  id: number;
  name: string;
  fantasyName: string;
  email: string;
  paymentMethods: string;
}

export default function Home() {
  const [producers, setProducts] = useState<IProducer>();
  const router = useRouter()
  const { id } = router.query

  

  useEffect(() => {
    console.log(router.query)
    const path = `http://localhost:3000/producers/${2}`
    fetch(path)
      .then(async (response) => {
        const data = await response.json();
        console.log("data: ", data);
        setProducts(data.items);
        console.log(producers)
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }, []);



  return (
    <Layout title="Home">
      <div className="container mx-auto p-4">
        
      <a className="text-white bg-emerald-800 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" href="/producers/register">
       Venha fazer parte da comunidade NutriVerde
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" className="w-5 h-5 ml-2 -mr-1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3">
          </path>
        </svg>
      </a>        
        
        <p className="text-4xl font-bold text-center my-4">
         Conheça nossos parceiros!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          
            <div
              key={producers.id}
              className="flex flex-col items-center bg-white rounded-lg border shadow-md"
            >
              <div className="flex flex-col justify-between px-4 py-2 leading-normal w-full">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  {producers.fantasyName}
                </h5>
                <hr className="mb-2 w-full" />
                <p>
                  <span className="font-bold">Responsável</span>: {producers.name}
                </p>
                <p>
                  <span className="font-bold">E-mail</span>:{" "}
                  <a
                    href={`mailto:${producers.email}`}
                    className="text-emerald-800 hover:underline active:text-emerald-600"
                  >
                    {producers.email}
                  </a>
                </p>
                <div className="pt-4 flex justify-end">
                  <Link href={`/producers/${producers.id}`}>
                    <a className="text-white bg-emerald-800 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                      Saiba mais{" "}
                      <ArrowRightIcon className="w-5 h-5 ml-2 -mr-1" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          )
        </div>
      </div>
    </Layout>
  );
}
