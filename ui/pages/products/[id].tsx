import {
  ChatIcon,
  PaperAirplaneIcon,
  ShoppingCartIcon,
  StarIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/outline";
import classNames from "classnames";
import { format } from "date-fns";
import { Formik } from "formik";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useState } from "react";
import NumberFormat from "react-number-format";
import InputField from "../../components/form/input-field";
import Layout from "../../components/layout";
import { IProducer, IProduct } from "../../interfaces";
import * as Yup from "yup";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const id = context.params?.id;
  if (!id) {
    console.error("error loading page - undefined ID");
    return {};
  }

  const props: { product?: IProduct; producer?: IProducer } = {
    product: undefined,
    producer: undefined,
  };

  {
    const resp = await fetch(`${serverUrl}/products/${id}`);
    const data = await resp.json();
    if (!data.item) {
      console.error("error loading page - product not found");
      return {};
    }
    props.product = data.item;
  }

  console.log(props);

  {
    const resp = await fetch(
      `${serverUrl}/producers/${props.product?.producerId}`
    );
    const data = await resp.json();
    if (!data.items) {
      console.error("error loading page - producer not found");
      return {};
    }
    props.producer = data.items;
  }

  return { props };
}

export default function ProductAbout({
  product,
  producer,
}: {
  product: IProduct;
  producer: IProducer;
}) {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const [selectedImage, setSelectedImage] = useState(product.cover);
  const [currentPrice, setCurrentPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(1);

  const formatDate = (str: string) => {
    const date = new Date(str);
    return format(date, "dd/MM/yyyy");
  };

  const updateQuantity = (e: any) => {
    let quantity = parseInt(e.target.value);
    if (isNaN(quantity) || quantity < 1) {
      quantity = 1;
    } else if (quantity > product.quantity) {
      quantity = product.quantity;
    }

    setQuantity(quantity);
    setCurrentPrice(quantity * product.price);
  };

  return (
    <Layout title={`${product.name}`}>
      <div className=" mx-auto p-4 flex flex-col gap-3">
        <div className="flex flex-row gap-2 p-4 w-full text-center bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-row basis-1/2 ">
            <div className="flex flex-col basis-1/4 gap-2 ">
              {product.images?.map((item) => (
                <img
                  className={classNames("cursor-pointer p-1", {
                    "border-solid border-2 border-emerald-800 rounded-md":
                      selectedImage === item,
                  })}
                  key={item}
                  src={`${serverUrl}/files/${item}`}
                  onClick={() => setSelectedImage(item)}
                />
              ))}
            </div>
            <div className="basis-3/4 ml-2">
              <img src={`${serverUrl}/files/${selectedImage}`}></img>
            </div>
          </div>

          <div className="basis-1/2 flex flex-col gap-6">
            <p className="text-4xl font-bold text-center my-4">
              {product.name}
            </p>

            <div className="flex flex-row gap-8">
              <div className="flex flex-col basis-1/2 items-start ml-8 gap-3 text-left">
                <p className="text-xl">
                  <span className="font-bold">Tipo:</span> {product.typology}
                </p>
                <p className="text-xl">
                  <span className="font-bold">Safra:</span>{" "}
                  {formatDate(product.cropDate)}
                </p>
                <p className="text-xl">
                  <span className="font-bold">Produtor:</span>{" "}
                  <Link href={`/producers/${product.producerId}`}>
                    <a className="text-emerald-800 hover:underline active:text-emerald-600">
                      {producer.name}
                    </a>
                  </Link>
                </p>
                <div>
                  <p className="font-bold text-xl">Descrição:</p>
                  <p className="text-justify">{product.description}</p>
                </div>
              </div>
              <div className="flex flex-col items-center basis-1/2">
                <div className="relative z-0 mb-6 w-32  group">
                  <input
                    type="number"
                    name="quantity"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-800 peer"
                    placeholder=" "
                    min={1}
                    value={quantity}
                    onChange={updateQuantity}
                  />
                  <label
                    htmlFor="quantity"
                    className="absolute left-0 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Quantidade
                  </label>
                </div>
                <p className="text-xl">
                  <NumberFormat
                    className="font-bold text-emerald-800 text-2xl"
                    value={currentPrice}
                    displayType="text"
                    prefix="R$"
                    decimalSeparator=","
                    thousandSeparator="."
                    decimalScale={2}
                    fixedDecimalScale
                  />
                </p>
                <button className="btn btn-primary mb-3 mr-2 w-60 mt-3">
                  <ShoppingCartIcon className="block w-6 h-6" /> Adicionar ao
                  carrinho
                </button>

                <p>Em estoque: {product.quantity}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="  p-4 w-full text-center bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-row gap-2">
            <ChatIcon className="block w-8 h-8" />
            <p className="text-2xl font-bold">Avaliações</p>
          </div>
          <div className="flex flex-row">
            <div className="basis-1/3">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-left mt-2">
                1,745 global ratings
              </p>
              <div className="flex items-center mt-4">
                <span className="text-sm font-medium ">5 star</span>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                  <div
                    className="h-5 bg-yellow-400 rounded"
                    style={{ width: "70%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium ">70%</span>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-sm font-medium ">4 star</span>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                  <div
                    className="h-5 bg-yellow-400 rounded"
                    style={{ width: "17%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium ">17%</span>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-sm font-medium ">3 star</span>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                  <div
                    className="h-5 bg-yellow-400 rounded"
                    style={{ width: "8%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium ">8%</span>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-sm font-medium ">2 star</span>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                  <div
                    className="h-5 bg-yellow-400 rounded"
                    style={{ width: "4%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium ">4%</span>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-sm font-medium ">1 star</span>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                  <div
                    className="h-5 bg-yellow-400 rounded"
                    style={{ width: "1%" }}
                  ></div>
                </div>
                <span className="text-sm font-medium ">1%</span>
              </div>
            </div>

            <div className="flow-root basis-2/3">
              <ul
                role="list"
                className="divide-y divide-gray-200 dark:divide-gray-700"
              >
                <li className="py-3 sm:py-4">
                  <Formik
                    initialValues={{ title: "", content: "", rating: 0 }}
                    validationSchema={Yup.object().shape({
                      title: Yup.string().required("Obrigatório"),
                      content: Yup.string().required("Obrigatório"),
                      rating: Yup.number().integer().min(1).max(5),
                    })}
                    onSubmit={(values) => console.log(values)}
                  >
                   
                    {({
                      values,
                      isValid,
                      isSubmitting,
                      errors,
                      setFieldValue,
                      setFieldTouched,
                      handleSubmit,
                      validateField,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0 content-center">
                            <UserCircleIcon className="block w-8 h-8" />
                            <p className="text-xs">Julinho</p>
                          </div>
                          <div className="flex-1 min-w-0 text-left">
                            <div className="">
                              {/* <input
                          className="text-xl w-full"
                          placeholder="Título"
                        /> */}
                              <InputField name="title"
                                className="text-xl w-full"
                                type="text"
                                label="Título"
                              />
                            </div>
                            <div>
                            <InputField name="content"
                               className="text-md w-full"
                                as = "textarea"
                                label="Review"
                              />
                              {/* <textarea
                                className="text-md w-full"
                                placeholder="Escreva seu comentário"
                              /> */}
                            </div>
                            <div className="flex flex-row">
                              <p className="text-xs text-left basis-1/2">
                                12/05/2005
                              </p>
                              <div className=" flex basis-1/2 place-content-end">
                                <button className=" btn btn-primary btn-sm text-xs ml-3  ">
                                  <PaperAirplaneIcon className="block w-4 h-4" />
                                  SUBMETER
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            <div className="flex items-center">
                              <svg
                                className="w-5 h-5 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                              <svg
                                className="w-5 h-5 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                              <svg
                                className="w-5 h-5 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                              <svg
                                className="w-5 h-5 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                              <svg
                                className="w-5 h-5 text-gray-300 dark:text-gray-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </form>
                    )}
                  </Formik>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 content-center">
                      <UserCircleIcon className="block w-8 h-8" />
                      <p className="text-xs">Julinho</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xl text-left font-bold">
                        Muito ruim, picou todo mundo
                      </p>
                      <p className="text-md text-left">
                        Abelha muito agressiva, tive que pisar nela.
                      </p>
                      <p className="text-xs text-left">12/05/2005</p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          className="w-5 h-5 text-gray-300 dark:text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <UserCircleIcon className="block w-8 h-8" />
                      <p className="text-xs">Julinho</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xl text-left font-bold">
                        Muito bom, maçã de qualidade
                      </p>
                      <p className=" text-md text-left">Saborosa.</p>
                      <p className="text-xs text-left">12/05/2005</p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg
                          className="w-5 h-5 text-gray-300 dark:text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* 
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <div className="flex flex-col">
                <UserCircleIcon className="block w-8 h-8" />
                <p className="text-xs">Julinho</p>
              </div>
              <div>
                <div className="flex flex-row gap-2">
                  <p className="text-xl text-left font-bold">
                    Muito ruim, picou todo mundo
                  </p>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      className="w-5 h-5 text-gray-300 dark:text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                </div>
                <p className="text-md text-left">
                  Abelha muito agressiva, tive que pisar nela.
                </p>
               
              </div>
            </div> */}
          {/* </div> */}
        </div>
      </div>
    </Layout>
  );
}
