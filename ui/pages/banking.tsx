import { CashIcon } from "@heroicons/react/outline";
import router from "next/router";
import * as Auth from "../services/auth";
import Layout from "../components/layout";
import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import * as Cart from "../services/cart";
import { LoadProductsFromOrderList } from "../services/loader";
import { IOrder } from "../interfaces";

export default function Banking() {
  const [parcel, setParcel] = useState(1);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [cartSum, setCartSum] = useState(0);

  const updateQuantity = (e: any) => {
    let quantity = parseInt(e.target.value);
    if (isNaN(quantity) || quantity < 1) {
      quantity = 1;
    } else if (quantity > 3) {
      quantity = 3;
    }

    setParcel(quantity);
    setCurrentPrice(cartSum / quantity);
  };

  useEffect(() => {
    if (Auth.isAuthenticated() === false) {
      router.push({
        pathname: "/404",
      });
    }
    const cartStored = Cart.getCart() as IOrder[];
    let sum: number = 0;
    if (cartStored) {
      LoadProductsFromOrderList(cartStored).then((ps) => {
        ps.forEach((item) => {
          const order = cartStored.find((value) => {
            return value.productId === item.id;
          });
          if (order) {
            sum += item.price * order.quantity;
          }
        });

        setCartSum(sum);
        setCurrentPrice(sum);
      });
    }
  }, []);

  function buyCart() {
    console.log("comprei!!!");
  }
  return (
    <Layout>
      Banking
      <div className="flex flex-col items-center basis-1/2">
        <div className="relative z-0 mb-6 w-32  group">
          <input
            type="number"
            name="parcel"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-800 peer"
            placeholder=" "
            min={1}
            max={3}
            value={parcel}
            onChange={updateQuantity}
          />
          <label
            htmlFor="parcel"
            className="absolute left-0 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Parcelas
          </label>
        </div>
        <p className="text-xl">
          <NumberFormat
            className="font-bold text-emerald-800 text-2xl"
            value={cartSum}
            displayType="text"
            prefix="R$"
            decimalSeparator=","
            thousandSeparator="."
            decimalScale={2}
            fixedDecimalScale
          />
        </p>
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
        <button
          className="btn btn-primary mb-3 mr-2 w-60 mt-3"
          onClick={buyCart}
        >
          <CashIcon className="block w-6 h-6" /> Confirmar Compra
        </button>
      </div>
    </Layout>
  );
}
