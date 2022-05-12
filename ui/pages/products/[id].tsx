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
import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import InputField from "../../components/form/input-field";
import Layout from "../../components/layout";
import { IProducer, IProduct, IReview } from "../../interfaces";
import * as Yup from "yup";
import * as Auth from "../../services/auth";
import Rating from "react-rating";

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
  const [reviews, setReviews] = useState<IReview[]>([]);

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

  const getReviews = () => {
    fetch(`${serverUrl}/products/${product.id}/reviews`)
      .then(async (response) => {
        const data = await response.json();
        console.log("reviews: ", data);

        const reviews: IReview[] = data.items;
        setReviews(
          reviews.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
        );
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };

  useEffect(() => {
    getReviews();
  }, []);

  const initialReview: IReview = {
    id: 0,
    userId: 0,
    userName: "",
    productId: product.id,
    images: [],
    title: "",
    content: "",
    date: new Date().toISOString(),
    rating: 0,
  };

  const submitReview = async (values: IReview) => {
    var token: any;
    if (typeof window !== "undefined") {
      token = Auth.getToken();
    }

    values.date = new Date().toISOString();
    const res = await fetch(`${serverUrl}/products/${product.id}/reviews`, {
      method: "POST",
      headers: {
        "x-auth-token": `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (res.status < 200 || res.status >= 300) {
      console.log("Error creating product", res);
      return;
    }

    getReviews();
  };

  const getReviewsPercent = (rating: number) => {
    if (!reviews?.length) "0%";

    const percent =
      (reviews.filter((e) => e.rating === rating).length / reviews.length) *
      100;
    return Math.round(percent) + "%";
  };

  return (
    <Layout title={`${product.name}`}>
      <div className=" mx-auto p-4 flex flex-col gap-3">
        <div className="flex flex-row gap-2 p-4 w-full text-center bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-row basis-1/2 ">
            <div className="flex flex-col basis-1/5 gap-2 ">
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

            <div className="flex flex-col items-center basis-4/5 ml-2">
              <img src={`${serverUrl}/files/${selectedImage}`}></img>

              {/* <div className="inline-flex items-center mt-10 text-base font-semibold text-gray-900 dark:text-white">
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
              </div> */}
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
                {reviews.length} avaliação(ões) totais
              </p>

              {[1, 2, 3, 4, 5].reverse().map((item) => (
                <div className="flex items-center mt-4">
                  <span className="text-sm font-medium ">{item} estrelas</span>
                  <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                    <div
                      className="h-5 bg-yellow-400 rounded"
                      style={{ width: getReviewsPercent(item) }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium ">
                    {getReviewsPercent(item)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flow-root basis-2/3">
              <ul
                role="list"
                className="divide-y divide-gray-200 dark:divide-gray-700"
              >
                <li className="py-3 sm:py-4">
                  <Formik
                    initialValues={initialReview}
                    validationSchema={Yup.object().shape({
                      title: Yup.string().required("Obrigatório"),
                      content: Yup.string().required("Obrigatório"),
                      rating: Yup.number().integer().min(1).max(5),
                    })}
                    onSubmit={submitReview}
                  >
                    {({ values, setFieldValue, handleSubmit }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0 content-center">
                            <UserCircleIcon className="block w-8 h-8" />
                            <p className="text-xs">{}</p>
                          </div>
                          <div className="flex-1 min-w-0 text-left">
                            <div className="">
                              <InputField
                                name="title"
                                className="text-xl w-full"
                                type="text"
                                label="Título"
                              />
                            </div>
                            <div>
                              <InputField
                                name="content"
                                className="text-md w-full"
                                as="textarea"
                                label="Review"
                              />
                            </div>
                            <div className="flex flex-row">
                              <p className="text-xs text-left basis-1/2">
                                {formatDate(values.date)}
                              </p>
                              <div className=" flex basis-1/2 place-content-end">
                                <button className=" btn btn-primary btn-sm text-xs ml-3  ">
                                  <PaperAirplaneIcon className="block w-4 h-4" />
                                  Enviar
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            <div className="flex items-center">
                              <Rating
                                emptySymbol={
                                  <svg
                                    className="w-5 h-5 text-gray-300 dark:text-gray-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                  </svg>
                                }
                                fullSymbol={
                                  <svg
                                    className="w-5 h-5 text-yellow-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                  </svg>
                                }
                                onChange={(rate) =>
                                  setFieldValue("rating", rate)
                                }
                                initialRating={values.rating}
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    )}
                  </Formik>
                </li>

                {reviews?.length ? (
                  reviews.map((item) => (
                    <li key={item.id} className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 content-center">
                          <div className="flex flex-col items-center">
                            <UserCircleIcon className="block w-8 h-8" />
                            <p className="text-xs">{item.userName}</p>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xl text-left font-bold">
                            {item.title}
                          </p>
                          <p className="text-md text-left">{item.content}</p>
                          <p className="text-xs text-left">
                            {formatDate(item.date)}
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          <div className="flex items-center">
                            <Rating
                              emptySymbol={
                                <svg
                                  className="w-5 h-5 text-gray-300 dark:text-gray-500"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                              }
                              fullSymbol={
                                <svg
                                  className="w-5 h-5 text-yellow-400"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                              }
                              initialRating={item.rating}
                              readonly
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li>
                    <p className="text-lg text-center mt-4">
                      Não há avaliações a serem mostradas
                    </p>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
