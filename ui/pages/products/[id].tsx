import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { IProduct } from "../../Interfaces";

export default function ProductAbout() {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const [product, setProduct] = useState<IProduct>();

  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    fetch(`${serverUrl}/producers/${id}`)
      .then(async (resp) => {
        const data = await resp.json();
        setProduct(data);
      })
      .catch((err) => console.log(err));
  });

  return (
    <Layout title={`Product - ${product?.name}`}>
      {/* <img src={`${serverUrl}/files/${product?.cover}`}></img> */}
      <div className=" mx-auto p-4 flex flex-col ">
        <div className="flex flex-row gap-2 p-4 w-full text-center bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-row basis-2/5 ">
            <div className="flex flex-col basis-1/4 gap-2 ">
              <img src="/home1.png"></img>
              <img src="/home2.png"></img>
              <img src="/home3.png"></img>
            </div>
            <div className=" flex basis-3/4 ml-2 place-content-center flex-none  ">
              <img className="" src="/home1.png"></img>
            </div>
          </div>

          <div className="basis-3/5 flex flex-col gap-6">
            <p className="text-4xl font-bold text-center my-4">
              Sopa de cogumelo e batata e cenoura
            </p>

            <div className="flex flex-row">
              <div className="flex flex-col basis-1/2 items-start ml-28 gap-3  ">
                <p className="text-xl">
                  <span className="font-bold">Preço:</span>R$25,00
                </p>
                <p className="text-xl">
                  <span className="font-bold">Tipo:</span>Tubérculo
                </p>
                <p className="text-xl">
                  <span className="font-bold">Safra:</span>11/10/2001
                </p>
                <p className="text-xl">
                  <span className="font-bold">Produtor:</span>
                  <a href="/producers/1">Carlos Augusto</a>
                </p>
                <div>
                  <p className="font-bold text-xl text-left">Descrição:</p>
                  <p className="text-justify">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center basis-1/2">
                <div className="relative z-0 mb-6 w-32  group">
                  <input
                    type="number"
                    name="quantity"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-800 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="quantity"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Quantidade
                  </label>
                </div>
                <button className="btn mb-3 mr-2 w-60 mt-3">
                  Adicionar ao carrinho
                </button>

                <p>Em estoque:85</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
