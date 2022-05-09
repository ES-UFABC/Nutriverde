import { type } from "os";

export interface IProducer {
  id: number;
  name: string;
  fantasyName: string;
  email: string;
  producerPaymentMethods: string[];
  phones: string[];
  productionAddress: address;
  productionRegion: string;
  negotiateOnProductionSite: boolean;
  businessAddress: address;
  businessIsCollective: boolean;
  coord: { lat: number; lng: number };
  affiliatedEntities: string[];
  cnpj: string;
  licensed: boolean;
  certificationsAndRecords: string[];
  agroEcological: boolean;
  agroEcologicalCertifications: string[];
  organic: boolean;
  externalWebPages: string[];
  productionsClassification: string[];
}
export type address = {
  street: string;
  codeId: string;
  cep: string;
  district: string;
  county: string;
};
export function stringifyAdress(address: address) {
  return (
    address.street +
    ", " +
    address.codeId +
    " - " +
    address.district +
    ", " +
    address.county +
    " - " +
    address.cep
  );
}
export interface IProduct {
  id: number;
  name: string;
  description: string;
  unitOfMeas: string;
  typology: string;
  price: number;
  specialDeliveryConditions: string;
  cropDate: string;
  quantity: number;
  cover: string;
  images: string[];
  producerId: number;
}
export interface IReview {
  id: number;
  userId: number;
  date: string;
  content: string;
  rating: number;
  title: string;
  images: string[];
}
