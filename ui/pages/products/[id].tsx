import classNames from "classnames";
import { format } from "date-fns";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import Layout from "../../components/layout";
import { IProducer, IProduct } from "../../Interfaces";

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

  const [selectedImage, setSelectedImage] = useState<string>(product.cover);
  const [currentPrice, setCurrentPrice] = useState<number>(product.price);
  const [quantity, setQuantity] = useState<number>(1);

  const formatDate = (str: string) => {
    const date = new Date(str);
    return format(date, "dd/MM/yyyy");
  };

  const updatePrice = (e: any) => {
    let quantity = parseInt(e.target.value);
    if (isNaN(quantity)) {
      quantity = 1;
    } else {
      quantity = quantity >= 1 ? quantity : 1;
    }
    setQuantity(quantity);
    setCurrentPrice(quantity * product.price);
  };

  return (
    <Layout title={`${product.name}`}>
      <div className=" mx-auto p-4 flex flex-col ">
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
                  <a href="/producers/1">{producer.name}</a>
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
                    onChange={updatePrice}
                  />
                  <label
                    htmlFor="quantity"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                  Adicionar ao carrinho
                </button>

                <p>Em estoque: {product.quantity}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
