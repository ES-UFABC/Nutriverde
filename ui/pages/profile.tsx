import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { ArrowRightIcon } from "@heroicons/react/outline";
import * as Auth from "../services/auth"
import React from 'react';
import { getToken } from "next-auth/jwt";
import router from "next/router";
import Login from "./login";

interface IUser {
  id: number
  name: string
  password: string
  email: string
  phones: string[]
  cpf: string
  address: string[]
  userPaymentMethods: string
}


export default function Home() {
  const [users, setUsers] = useState<IUser>();

  let token: any
  if (typeof window !== 'undefined') {
    token = Auth.getToken()
  }


  const requestOptions = {
    method: 'GET',
    headers: { 'x-auth-token': `${token}` }
  };

  useEffect(() => {

    fetch('http://localhost:3000/me', requestOptions)
      .then(async (response) => {
        const data = await response.json();
        setUsers(data.items)
      })
      .catch((err) => {
        console.log("error: ", err);
      });

  }, []);


  function condRender() {
    let render;
    if (token) {
      render = (<Layout title="Profile">
        <div className="container mx-auto p-4 flex flex-col justify-content-center">
          <p className="text-4xl font-bold text-center my-4">
            Perfil de Usuário
          </p>
          <hr className="w-full" />
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-col  pb-10 " >
                <div className="bg-emerald-700 text-center">
                  <h5 className="text-xl font-white text-white dark:text-white ">Dados do Perfil</h5>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400 text-center">Consumidor</span>
                <h4>
                  <span className="font-bold">Nome</span>: {users?.name}
                </h4>
                <h4>
                  <span className="font-bold">Email</span>: {users?.email}
                </h4>
                <h4>
                  <span className="font-bold">Endereço</span>: {users?.address}
                </h4>
                <p>
                  <span className="font-bold">Telefone</span>: {users?.phones}
                </p>
                <p>
                  <span className="font-bold">CPF</span>: {users?.cpf}
                </p>
                <div className="flex mt-2 space-x-3 lg:mt-3 place-self-center">
                  <a href="#" className="inline-flex py-2 px-4 text-sm font-medium text-center text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Ir ao Perfil de Produtor</a>
                </div>
              </div>
            </div>
            <div className="col-span-3 max-w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-col items-center pb-10">
                <div className="mb-2 w-full bg-emerald-700 text-center">
                  <h5 className="mb-1  text-xl font-white text-white dark:text-white ">Meus Pedidos</h5>
                </div>

              </div>
            </div>
          </div>
        </div>

      </Layout>)
    } else {
      render = <Login message="Login First"/>
    }
    return render;
  }



  return (
    <>
    {condRender()}
    </>
  );
}
