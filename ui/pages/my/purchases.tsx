import Layout from "../../components/layout";
import * as Auth from "../../services/auth";
import * as Cart from "../../services/cart";
import {
  LoadProductsFromOrderList,
  LoadProducer,
  LoadConsumerOrders,
  LoadProduct,
} from "../../services/loader";
import { IProduct, IProducer, IOrder } from "../../interfaces";
import { useEffect, useState } from "react";
import Link from "next/link";
import router from "next/router";

function ItemLine({ item }: { item: IOrder }) {
  const [producer, setProducer] = useState<IProducer>({} as IProducer);
  const [product, setProduct] = useState<IProduct>({} as IProduct);
  useEffect(() => {
    LoadProducer(item.producerId).then((p) => {
      setProducer(p);
    });
    LoadProduct(item.productId).then((p) => {
      setProduct(p);
    });
  }, []);
  return (
    <div>
      <p>
        {product && product.name} {product && product.unitOfMeas}{" "}
        {product && product.price} R$ <span>- {item.quantity} +</span> R${" "}
        {product && product.price * item.quantity}
      </p>
      <p>
        {producer && producer.name} {product && product.typology} excluir
      </p>
    </div>
    // banana        cacho  4,00 R$     - 3 +   R$ 12,00
    //   fazendo macaco-bandeira  tuberculo     excluir
  );
}

export default function Purchases() {
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    if (Auth.isAuthenticated() === false) {
      router.push({
        pathname: "/404",
      });
    }
    const token = Auth.getToken();
    LoadConsumerOrders(token).then((os) => {
      setOrders(os);
    });
  }, []);

  return (
    <Layout title="Carrinho">
      {orders.map((item, key) => (
        <ItemLine item={item} key={key} />
      ))}
    </Layout>
  );
}
