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
      <p>TESTE</p>
    </Layout>
  );
}
