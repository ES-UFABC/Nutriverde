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
        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col items-center pb-10">
            <img className="mb-3 w-24 h-24 rounded-full shadow-lg" src="/home1.png" alt={users?.name}/>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{users?.name}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">Consumidor</span>
            <p>
              <span className="font-bold">Email</span>: {users?.email}
            </p>
            <p>
              <span className="font-bold">Endereço</span>: {users?.address}
            </p>
            <p>
              <span className="font-bold">Telefone</span>: {users?.phones}
            </p>
            <p>
              <span className="font-bold">CPF</span>: {users?.cpf}
            </p>
            <p>
              <span className="font-bold">Senha</span>: {users?.password}
            </p>
            <div className="flex mt-4 space-x-3 lg:mt-6">
              <a href="#" className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Perfil de Produtor</a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
