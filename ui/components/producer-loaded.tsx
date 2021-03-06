import Image from "next/image";
import { IProducer, IAddress, stringifyAdress } from "../interfaces";

export default function ProducerLoaded(props: any) {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const producer: IProducer = props.item as IProducer;
  producer.producerPaymentMethods =
    (producer.producerPaymentMethods as []) || [];
  producer.phones = (producer.phones as []) || [];
  producer.affiliatedEntities = (producer.affiliatedEntities as []) || [];
  producer.certificationsAndRecords =
    (producer.certificationsAndRecords as []) || [];
  producer.agroEcologicalCertifications =
    (producer.agroEcologicalCertifications as []) || [];
  producer.productionsClassification =
    (producer.productionsClassification as []) || [];
  producer.externalWebPages = (producer.externalWebPages as []) || [];
  producer.businessAddress = producer.businessAddress || ({} as IAddress);
  producer.productionAddress = producer.productionAddress || ({} as IAddress);
  function toString(array: string[]) {
    if (array instanceof Array)
      return array.length < 1
        ? "nenhum"
        : array.map((doc) => " " + doc).toString();
    else return "nenhum";
  }
  function line(title: string, text: string) {
    return (
      <p>
        <span className="font-bold">{title}</span>: {text}
      </p>
    );
  }
  return (
    <div>
      <p className="text-4xl font-bold text-center my-4 ">
        {producer.fantasyName}
      </p>
      <div
        style={{ display: "flex", height: "200px" }}
        className="w-full h-48 relative place-content-center"
      >
        {producer?.cover && (
          <img
            className="object-cover rounded-none rounded-t-lg"
            src={`${serverUrl}/files/${producer?.cover}`}
            alt={producer?.name}
            width={300}
            height={300}
          />
        )}
        {!producer?.cover && (
          <Image
            className="object-cover rounded-none rounded-t-lg"
            src={"/placeholder.png"}
            width={300}
            height={300}
            alt={producer?.name}
          />
        )}
      </div>
      <div className="">
        {line("Respons??vel", producer.name)}
        <p>
          <span className="font-bold">E-mail</span>:{" "}
          <a
            className="text-emerald-800 hover:underline active:text-emerald-600"
            href={`mailto:${producer.email}`}
          >
            {" "}
            {producer.email}{" "}
          </a>
        </p>
        <p>
          <span className="font-bold">M??todos de Pagamento</span>:{" "}
          {producer.producerPaymentMethods}
        </p>
        <p>
          <span className="font-bold">Telefones</span>: {producer.phones}
        </p>
        {line(
          "Endere??o de Produ????o",
          stringifyAdress(producer.productionAddress)
        )}
        {line("Comunidade ou Regi??o de Produ????o", producer.productionRegion)}
        {line(
          "Atente no endere??o de produ????o",
          producer.negotiateOnProductionSite ? "sim" : "n??o"
        )}
        {line(
          "Endere??o de Comercio",
          stringifyAdress(producer.businessAddress)
        )}
        {line(
          "Tipo de Produtor",
          producer.businessIsCollective ? "Coletivo" : "Individual"
        )}
        <p>
          <span className="font-bold">Cadastrado em Entidades</span>:{" "}
          {producer.affiliatedEntities}
        </p>
        {line("CNPJ", producer.cnpj)}
        {line("Produtor licenciado?", producer.licensed ? "sim" : "n??o")}
      </div>
      <div className="">
        <p>
          <span className="font-bold">Registros ou Certifica????es</span>:{" "}
          {producer.certificationsAndRecords}
        </p>
        {line(
          "Produtor Agroecol??gico",
          producer.agroEcological ? "sim" : "n??o"
        )}
        <p>
          <span className="font-bold">Certifica????es Agroecol??gicas</span>:{" "}
          {producer.agroEcologicalCertifications}
        </p>
        {line("Produtor de Organicos", producer.organic ? "sim" : "n??o")}
        <p>
          <span className="font-bold">Paginas Externas</span>:
          {/* {
                        producer.externalWebPages[0].split(",").map(link => (

                        )

                    )} */}
          <a
            href={
              "https://" +
              `${producer.externalWebPages && producer.externalWebPages!}`
            }
            className="text-emerald-800 hover:underline active:text-emerald-600"
          >
            {" "}
            {producer.externalWebPages && producer.externalWebPages!}
          </a>
        </p>
        <p>
          <span className="font-bold">Tipos de Produ????o</span>:{" "}
          {producer.productionsClassification}
        </p>
      </div>
    </div>
  );
}
