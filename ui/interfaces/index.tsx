export interface IProducer {
  id: number;
  name: string;
  fantasyName: string;
  email: string;
  producerPaymentMethods: string[];
  phones: string[];
  productionAddress: IAddress;
  productionRegion: string;
  negotiateOnProductionSite: boolean;
  businessAddress: IAddress;
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
export interface IAddress {
  street: string;
  codeId: string;
  cep: string;
  district: string;
  county: string;
}
export function stringifyAdress(address: IAddress) {
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

export interface IFile extends File {
  id: string;
  preview: string;
}

// export interface IPrescription {
export interface IPrescription {
  productId: number;
  quantity: number;
}
export interface IOrder {
  id: number;
  date: string;
  quantity: number;
  productId: number;
  producerId: number;
  consumerId: number;
}
