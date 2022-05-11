import Layout from "../components/layout";
import * as Auth from "../services/auth";
import * as Cart from "../services/cart";
import { LoadProductsFromOrderList, LoadProducer } from "../services/loader";
import { IProduct, IProducer, IOrder } from "../interfaces";
import { useEffect, useState } from "react";

// async function callCart(onSet: (list: IOrder[]) => void) {
//   console.log("CartPage callCart ");
//   const c = Cart.getCart();
//   if (c) {
//     console.log("CartPage callCart  carro", c);
//     const r = await LoadProductsFromOrderList(c);
//     console.log("CartPage callCart  results", r);
//   } else {
//     console.log("CartPage callCart sem desejos no carro");
//   }
// }
async function productOnCart() {
  console.log("CartPage productNoCart");
  Cart.addOrUpdate(1, 3);
  Cart.addOrUpdate(7, 2);
  Cart.addOrUpdate(9, 4);
}

function ItemLine({ product, order }: { product: IProduct; order: IOrder }) {
  const [producer, setProducer] = useState<IProducer>({} as IProducer);
  useEffect(() => {
    LoadProducer(product.producerId).then((p) => {
      setProducer(p);
    });
  }, []);
  return (
    <div>
      <p>
        {product.name} {product.unitOfMeas} {product.price} R${" "}
        <span>- {order.quantity} +</span> R$ {product.price * order.quantity}
      </p>
      <p>
        {producer.name} {product.typology} excluir
      </p>
    </div>
    // banana        cacho  4,00 R$     - 3 +   R$ 12,00
    //   fazendo macaco-bandeira  tuberculo     excluir
  );
}

interface ICombo {
  product: IProduct;
  order: IOrder;
}

export default function CartPage() {
  const [cart, setCart] = useState<IOrder[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [combos, setCombos] = useState<ICombo[]>([]);
  const [sumAmount, setSumAmount] = useState<number>(0);

  useEffect(() => {
    const cartStored = Cart.getCart();
    if (cartStored) {
      setCart(cartStored);
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      LoadProductsFromOrderList(cart).then((ps) => {
        setProducts(ps);
      });
    }
  }, [cart]);

  useEffect(() => {
    const newCombos: ICombo[] = [];
    products.forEach((item) => {
      const order = cart.find((value) => {
        return value.productId === item.id;
      });
      if (order) {
        newCombos.push({ product: item, order: order } as ICombo);
      }
    });
    console.log(newCombos);

    setCombos(newCombos);
  }, [products]);

  useEffect(() => {
    let sum: number = 0;
    combos.forEach((it) => {
      sum += it.product.price * it.order.quantity;
    });
    setSumAmount(sum);
  }, [combos]);
  function actionLink() {
    if (Auth.isAuthenticated()) {
      return (
        <a
          className="text-white bg-emerald-800 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          href="/banking"
        >
          Comprar Tudo
        </a>
      );
    } else {
      return (
        <a
          className="text-white bg-emerald-800 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          href="/login"
        >
          Entre no NutriVerde para comprar!
        </a>
      );
    }
  }
  return (
    <Layout title="Carrinho">
      <button
        className="btn btn-primary mb-3 mr-2 w-60 mt-3"
        onClick={productOnCart}
      >
        produto no carrinho
      </button>
      {combos.map((item, key) => (
        <ItemLine product={item.product} order={item.order} key={key} />
      ))}
      <div>
        <span>Total:</span> R$ {sumAmount}
      </div>
      {actionLink()}
    </Layout>
  );
}
