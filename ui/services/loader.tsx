import { IProducer, IProduct, IPrescription, IOrder } from "../interfaces";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export async function LoadProducer(id: number): Promise<IProducer> {
  try {
    const resp = await fetch(`${serverUrl}/producers/${id}`);
    const data = await resp.json();
    console.log("data: ", data);
    console.log("LoadProducer fetch sucess", id);
    return data.items as IProducer;
  } catch (error) {
    console.log("LoadProducer error: ", error);
    throw error;
  }
}
export async function LoadProduct(id: number): Promise<IProduct> {
  try {
    const resp = await fetch(`${serverUrl}/products/${id}`);
    const data = await resp.json();
    console.log("data: ", data);
    console.log("LoadProduct fetch sucess", id);
    return data.item as IProduct;
  } catch (error) {
    console.log("LoadProduct error: ", error);
    throw error;
  }
}

export async function LoadProducts(id: number): Promise<IProduct[]> {
  try {
    const resp = await fetch(`${serverUrl}/producers/${id}/products`);
    const data = await resp.json();
    console.log("data: ", data);
    console.log("LoadProducts fetch sucess", id);
    return data.items as IProduct[];
  } catch (error) {
    console.log("LoadProducts error: ", error);
    throw error;
  }
}
export async function LoadConsumerOrders(token: any): Promise<IOrder[]> {
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "x-auth-token": `${token}`,
      },
    };
    const path = "orders/consumer";
    const resp = await fetch(`${serverUrl}/${path}`, requestOptions);
    const data = await resp.json();
    console.log("LoadConsumerOrders data: ", data);
    return data.items as IOrder[];
  } catch (error) {
    console.log("LoadConsumerOrders error: ", error);
    throw error;
  }
}

export async function LoadProductsFromOrderList(
  list: IPrescription[]
): Promise<IProduct[]> {
  try {
    const idsList = list.map((item) => {
      return item.productId;
    });
    // console.log("LoadProductsFromOrderList idsList: ", idsList);
    const url =
      `${serverUrl}/products/orders?` +
      new URLSearchParams({ idsList: JSON.stringify(idsList) }).toString();
    // console.log("LoadProductsFromOrderList URL: ", url);
    const response = await fetch(url);
    // console.log("LoadProductsFromOrderList resp", response);
    const data = await response.json();
    console.log("LoadProductsFromOrderList data: ", data);
    // return data.items as IProduct[];
    return data.items;
  } catch (error) {
    console.log("LoadProductsFromOrderList error: ", error);
    throw error;
  }
}
