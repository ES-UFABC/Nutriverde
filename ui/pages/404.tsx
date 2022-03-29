import Layout from "../components/layout";

export default function Custom404() {
  return (
    <Layout title="Não encontrado" center>
      <div className="grid place-content-center">
        <p className="text-9xl text-center">404</p>
        <p className="text-2xl text-center">Página não encontrada</p>
      </div>
    </Layout>
  );
}
