import { type } from "os";

export interface IProducer {
    id: number;
    name: string;
    fantasyName: string;
    email: string;
    producerPaymentMethods: string[];
    phones: string[];
    productionAddress: address
    productionRegion: string;
    negotiateOnProductionSite: boolean;
    businessAddress: address
    businessIsCollective: boolean;
    coord: { lat: number; lng: number; };
    affiliatedEntities: string[];
    cpfOrCnpj: string;
    licensed: boolean;
    certificationsAndRecords: string[];
    agroEcological: boolean;
    agroEcologicalCertifications: string[];
    organic: boolean;
    externalWebPages: string[];
    productionsClassification: string[];
};
export type address = {
    site: string;
    code: string;
    cep: string;
    district: string;
    county: string;
};

export async function stringifyAdress(address:address): Promise<string> {
    try {
        return (
            address.site + ", " +
            address.code + " - " +
            address.district + ", " +
            address.county + " - " +
            address.cep
        )
    } catch (error) {
        throw error
    }
}
export interface IProduct {
    id: number;
    name: string;
    unitOfMeas: string;
    typology: string;
    price: number;
    specialDeliveryConditions: string;
    quantity: number;
    cover: string;
}