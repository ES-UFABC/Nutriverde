import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { ArrowRightIcon } from "@heroicons/react/outline";

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

  useEffect(() => {
    fetch("http://localhost:3000/users/20")
      .then(async (response) => {
        const data = await response.json();
        console.log("data: ", data);
        setUsers(data.items);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }, []);

  return (
    <Layout title="Home">
      <div className="container mx-auto p-4 center-horizontal">
        <p className="text-4xl font-bold text-center my-4">
          Perfil do usuário
        </p>
        <hr className="mb-2 w-full"/>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-col items-center pb-10">
              <h5 className="mb-1 text-xl font-black text-gray-900 dark:text-white">Dados do Perfil</h5>
                <hr className="mb-2 w-full"/>
                <span className="text-sm text-gray-500 dark:text-gray-400">Consumidor</span>
                <h4 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">Nome: {users?.name}</h4>            
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
                <div className="flex mt-4 space-x-3 lg:mt-6">
                  <a href="#" className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Perfil de Produtor</a>
                </div>
              </div>
            </div>
            <div className="col-span-3 max-w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-col items-center pb-10">
              <h5 className="mb-1 text-xl font-black text-gray-900 dark:text-white">Meus Pedidos</h5>
                <hr className="mb-2 w-full"/>

              </div>
            </div>
          </div>
      </div>
      
    </Layout>
  );
}
