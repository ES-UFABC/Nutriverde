import Image from "next/image"
import { IProducer, address, stringifyAdress } from "../Interfaces"

export default function ProducerLoaded(props: any) {
    const producer: IProducer = props.item as IProducer
    producer.producerPaymentMethods = producer.producerPaymentMethods as [] || []
    producer.phones = producer.phones as [] || []
    producer.affiliatedEntities = producer.affiliatedEntities as [] || []
    producer.certificationsAndRecords = producer.certificationsAndRecords as [] || []
    producer.agroEcologicalCertifications = producer.agroEcologicalCertifications as [] || []
    producer.productionsClassification = producer.productionsClassification as [] || []
    producer.externalWebPages = producer.externalWebPages as [] || []
    producer.businessAddress = producer.businessAddress || {} as address
    producer.productionAddress = producer.productionAddress || {} as address
    function toString(array: string[]) {
        if (array instanceof Array)
            return array.length < 1 ? "nenhum" : array.map(doc => " " + doc).toString()
        else return "nenhum"
    }
    function line(title: string, text: string) {
        return <p><span className="font-bold">{title}</span>: {text}</p>
    }
    return (
        <div>
            <p className="text-4xl font-bold text-center my-4 ">
                {producer.fantasyName}
            </p><div style={{ display: "flex", height: "200px" }} className="w-full h-48 relative">
                <Image
                    className="object-cover w-full h-96 rounded-none rounded-t-lg md:h-auto md:w-48"
                    src={`/home${producer.id}.png`}
                    layout="fill"
                    alt={producer.fantasyName} />
            </div>
            <div className="">
                {line("Responsável", producer.name)}
                <p><span className="font-bold">E-mail</span>: {" "}
                    <a className="text-emerald-800 hover:underline active:text-emerald-600"
                        href={`mailto:${producer.email}`}
                    > {producer.email} </a></p>
                <p><span className="font-bold">Métodos de Pagamento</span>: {(producer.producerPaymentMethods)}</p>
                <p><span className="font-bold">Telefones</span>: {(producer.phones)}</p>
                {line("Endereço de Produção", stringifyAdress(producer.productionAddress))}
                {line("Comunidade ou Região de Produção", producer.productionRegion)}
                {line("Atente no endereço de produção", producer.negotiateOnProductionSite ? "sim" : "não")}
                {line("Endereço de Comercio", stringifyAdress(producer.businessAddress))}
                {line("Tipo de Produtor", producer.businessIsCollective ? "Coletivo" : "Individual")}
                <p><span className="font-bold">Cadastrado em Entidades</span>: {(producer.affiliatedEntities)}</p>
                {line("CNPJ", producer.cnpj)}
                {line("Produtor licenciado?", producer.licensed ? "sim" : "não")}
            </div>
            <div className="">
                <p><span className="font-bold">Registros ou Certificações</span>: {producer.certificationsAndRecords}</p>
                {line("Produtor Agroecológico", producer.agroEcological ? "sim" : "não")}
                <p><span className="font-bold">Certificações Agroecológicas</span>: {producer.agroEcologicalCertifications}</p>
                {line("Produtor de Organicos", producer.organic ? "sim" : "não")}
                <p><span className="font-bold">Paginas Externas</span>:
                    {/* {
                        producer.externalWebPages[0].split(",").map(link => (

                        )

                    )} */}

                    <a
                        href={"https://"+`${producer.externalWebPages && producer.externalWebPages!}`}
                        className="text-emerald-800 hover:underline active:text-emerald-600"
                    >
                        {" "}{producer.externalWebPages && producer.externalWebPages!}
                    </a>
                </p>
                <p><span className="font-bold">Tipos de Produção</span>: {producer.productionsClassification}</p>
            </div>
        </div>
    )
}