import Layout from "../components/layout";
import Image from "next/image";

export default function About() {
  return (
    <Layout title="Sobre">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-4">
          Sobre o NutriVerde
        </h1>
        <div className="flex flex-col lg:flex-row items-center mb-4 gap-2">
          <p className="basis-3/4">
            Nossa aplicação tem como objetivo facilitar a comunicação e
            comercialização de produtos entre pequenos produtores e compradores,
            através de uma plataforma de anúncios em que produtores cadastram
            seus produtos, área de atuação e parceiros para que os potenciais
            compradores consigam localizar as melhores opções de produtos dentro
            de determinadas regiões e também produtores que estejam de acordo
            com suas preferências.
          </p>
          <div className="relative basis-1/4">
            <Image
              src="/home1.png"
              width={768}
              height={401}
              className="rounded-lg"
            />
          </div>
        </div>
        <div className="flex flex-col-reverse lg:flex-row items-center gap-2">
          <div className="relative basis-1/4">
            <Image
              src="/home3.png"
              width={514}
              height={342}
              className="rounded-lg"
            />
          </div>
          <p className="basis-3/4">
            Além do comércio, nossa aplicação mostra para o público toda a
            variedade de produtos disponíveis em sua região, enriquecendo seu
            entendimento sobre a produção de suas redondezas.
          </p>
        </div>
      </div>
    </Layout>
  );
}
