import Image from "next/image";
import { IProducer, address, stringifyAdress } from "../interfaces";

export default function ProducerLoaded(props: any) {
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
  producer.businessAddress = producer.businessAddress || ({} as address);
  producer.productionAddress = producer.productionAddress || ({} as address);
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
        className="w-full h-48 relative"
      >
        <Image
          className="object-cover w-full h-96 rounded-none rounded-t-lg md:h-auto md:w-48"
          src={`/home${producer.id}.png`}
          layout="fill"
          alt={producer.fantasyName}
        />
      </div>
      <div className="">
        {line("Responsável", producer.name)}
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
        {line(
          "Métodos de Pagamento",
          toString(producer.producerPaymentMethods)
        )}
        {line("Telefones", toString(producer.phones))}
        {line(
          "Endereço de Produção",
          stringifyAdress(producer.productionAddress)
        )}
        {line("Comunidade ou Região de Produção", producer.productionRegion)}
        {line(
          "Atente no endereço de produção",
          producer.negotiateOnProductionSite ? "sim" : "não"
        )}
        {line(
          "Endereço de Comercio",
          stringifyAdress(producer.businessAddress)
        )}
        {line(
          "Tipo de Produtor",
          producer.businessIsCollective ? "Coletivo" : "Individual"
        )}
        {line("Cadastrado em Entidades", toString(producer.affiliatedEntities))}
        {line("CNPJ", producer.cnpj)}
        {line("Produtor licenciado?", producer.licensed ? "sim" : "não")}
      </div>
      <div className="">
        {line(
          "Registros ou Certificações",
          toString(producer.certificationsAndRecords)
        )}
        {line(
          "Produtor Agroecológico",
          producer.agroEcological ? "sim" : "não"
        )}
        {line(
          "Certificações Agroecológicas",
          toString(producer.agroEcologicalCertifications)
        )}
        {line("Produtor de Organicos", producer.organic ? "sim" : "não")}
        <p>
          <span className="font-bold">Paginas Externas</span>:
          {producer.externalWebPages.map((webLink) => (
            <a
              href={`${webLink}`}
              className="text-emerald-800 hover:underline active:text-emerald-600"
            >
              {" "}
              {webLink}
            </a>
          ))}
        </p>
        {line(
          "Tipos de Produção",
          toString(producer.productionsClassification)
        )}
      </div>
    </div>
  );
}
