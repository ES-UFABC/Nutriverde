import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { ArrowRightIcon } from "@heroicons/react/outline";
import * as Auth from "../services/auth"
import React from 'react';
import router from "next/router";
import Login from "./login";
import { IProducer, address, stringifyAdress } from "../Interfaces"


export default function Home() {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const [producer, setProducer] = useState<IProducer>();

  let token: any
  if (typeof window !== 'undefined') {
    token = Auth.getToken()
  }


  const requestOptions = {
    method: 'GET',
    headers: { 'x-auth-token': `${token}` }
  };

  useEffect(() => {

    fetch(`${serverUrl}/me`, requestOptions)
      .then(async (response) => {
        const data = await response.json();
        console.log(data)
        if (response.status == 401) {
          console.log("Server-Message", data.message)
          router.push({
            pathname: '/login'
          })
        }
        setProducer(data.items)

        if (data.items.fantasyName == undefined) {
          console.log("Requisição Inválida")
          router.push({
            pathname: '/producerRegister'
          })
        }
      })
      .catch((err) => {
        console.log("error: ", err);
      });

  }, []);


  function condRender() {
    let render;
    if (token) {
      render = (<Layout title="Perfil de Produtor">
        <div className="container mx-auto p-4 flex flex-col justify-content-center">
          <p className="text-4xl font-bold text-center my-4">
            Perfil de Produtor
          </p>
          <hr className="w-full" />
          <div className="flex w-full h-full relative justify-center mt-3 mb-3">
              {producer?.cover && (
                <img
                  className="object-cover rounded-none rounded-t-lg"
                  src={`${serverUrl}/files/${producer?.cover}`}
                  alt={producer?.name}
                  width={300}
                  height={300}
                />
              )}
              {!producer?.cover && (
                <Image
                  className="object-cover rounded-none rounded-t-lg"
                  src={"/placeholder.png"}
                  width={300}
                  height={300}
                  alt={producer?.name}
                />
              )}
            </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-1 ">
            
            <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-col  pb-10 " >
                <div className="bg-emerald-700 text-center">
                  <h5 className="text-xl font-white text-white dark:text-white ">Dados do Perfil</h5>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 text-center">Produtor</span>
                <div>
                  <span className="font-bold">Nome Fantasia</span>: {producer?.fantasyName}
                </div>
                <h3>
                  <span className="font-bold">Metodos Pagamento Aceitos</span>: {producer?.producerPaymentMethods}
                </h3>
                <h4>
                  <span className="font-bold">CPNJ</span>: {producer?.cnpj}
                </h4>
                <h3>
                  <span className="font-bold">Endereço de Produção</span>: {producer?.productionAddress?.street +
                    ", " + producer?.productionAddress?.codeId + ", " + producer?.productionAddress?.county}
                </h3>
                <h3>
                  <span className="font-bold">Endereço de Comercialização</span>: {producer?.businessAddress?.street +
                    ", " + producer?.businessAddress?.codeId + ", " + producer?.businessAddress?.county}
                </h3>
              </div>
            </div>
            <div className="col-span-3 max-w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-col items-center pb-10">
                <div className="mb-2 w-full bg-emerald-700 text-center">
                  <h5 className="mb-1  text-xl font-white text-white dark:text-white ">Meus Produtos</h5>
                </div>

              </div>
            </div>
          </div>
        </div>

      </Layout>)
    }
    return render;
  }



  return (
    <>
      {condRender()}
    </>
  );
}
