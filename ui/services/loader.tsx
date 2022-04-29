import { IProducer, IProduct } from "../Interfaces";

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
