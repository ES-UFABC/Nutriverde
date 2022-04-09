import * as dbConnection from "./db-connection"
import {config} from '../config'
import * as dbConnect from "./db-connection"

/**
 * Producer model
 * 
 * { "_id" : ObjectId("623b3e977e48e9c814f04938"), 
 * 
 * 
 *  
 * "phones" : [ "123456789" ],
 * "productionAddress" :  ["Deltafarm","123","bairro","01234-567","Municipio"] ,
 * "productionRegion": "Comunidade Azul",
 * "negotiateOnProductionSite" : true,
 * 
 * "businessAddress" : ["Alphaville","142","bairro","01234-567","Municipio"] ,
 * "bussinessType" : "single",
 * "georeferencedLocalization" : { "lat": 90, "lng":123 }, 
 * 
 * "affiliatedEntities" : [ ],
 * 
 * "cpfOrCnpj" : "123456789-A",
 * "licensed": false,
 * "certifications" : [ ],
 * 
 * "agroEcological" : false,
 * "agroEcologicalCertifications" : [ ], 
 * 
 * "organical" : true, , 
 * "externalWebPages" : [ ],
 * "isNative" : true, 
 * 
 * "productionsClassification" : [ "Tuberculos e raizes" ],
 * 
 * "localMarketPlace" : "Feira de quinta",
 * "dapFísica" : "" }
 * 
 */
export class Producer {
    id: number
    name: string
    fantasyName: string
    email: string
    paymentMethods: string
    phones!: [string]
    productionAddress!: {
        street: string;
        codeId: string;
        district: string;
        cep: string;
        county: string; }
    productionRegion!: string
    negotiateOnProductionSite!: boolean
    businessAddress!: {
        street: string;
        codeId: string;
        district: string;
        cep: string;
        county: string; }
    businessIsCollective!: boolean
    geoReferencedLocalization!: { lat: number; lng: number; }
    affiliatedEntities!: [string]
    cpfOrCnpj!: string
    licensed!: boolean
    certificationsAndRecords!: [string]
    agroEcological!: boolean
    agroEcologicalCertifications!: [string]
    organic!: boolean
    externalWebPages!: [string]
    productionsClassification!: [string]

    constructor(name: string, paymentMethods: string, fantasyName: string, email: string) {
        this.id = 0
        this.name = name
        this.email = email
        this.fantasyName = fantasyName
        this.paymentMethods = paymentMethods
    }

    // constructor(json:any) {
    //     Object.keys(json).forEach(
    //         (key:string) => {
    //             if(key in this) {
    //                 this[key] = json[key]
    //             }
    //         })
    // }
    isValid() {
        return this.name.length > 0 && this.paymentMethods.length > 0
    }

    /**
     * Convert a JSON representation to an Producer instance
     * @param json the JSON representation
     * @returns the Producer instance
     */
    static decode(json: any): Producer {
        for (const prop of ["email", "paymentMethods", "name"]) {
            if (!(prop in json)) {
                throw new Error(`Property ${prop} is required`)
            }
        }

        const producer = new Producer(json.name, json.paymentMethods, json.fantasyName, json.email)

        if ("id" in json) {
            producer.id = parseInt(json.id)
        }
        
        if ("fantasyName" in json) {
            producer.fantasyName = json.fantasyName
        }

        return producer
    }
}

/**
 * Producer DAO Singleton
 */
export class ProducerDAO {
    private static instance: ProducerDAO

    private constructor() {}

    static getInstance() {
        if (!this.instance) {
            this.instance = new ProducerDAO()
        }
        return this.instance
    }
    
    getCollection() {
        return dbConnection.getDb().collection(config.db.collections.producers)
    }

    /**
     * Retrieve an Producer given its name
     * @param name the Producer name
     * @returns the Producer
     */
    async findByname(name: string): Promise<Producer> {
        try {
            const response = await this.getCollection().findOne({name: name})

            if (response) {
                return Producer.decode(response)
            }
            throw Error("Failed to retrieve Producer with given name")
        } catch (error) {
            console.error("Error while retrieving Producer")
            throw error
        }
    }
    async update(Producer:Producer){
        try {
            const response = await this.getCollection().replaceOne(
                { name: Producer.name }, Producer)

            return (response) ? response.modifiedCount > 0 : false
        } catch (error) {
            
        }
    }
    async removeByname(name : string ){
        try {
            const response = await this.getCollection().deleteOne({name:name})
            return (response.deletedCount) ? response.deletedCount > 0 : false
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async listAll() : Promise<Producer[]>{
        try {
            const response = await this.getCollection().find({},
                {projection : {_id:0}}
            ).toArray() || []
            if( response ){
                return response as Producer[]
            }
            throw Error("Erro na opreação de listagem de Autores")
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    async insert(Producer : Producer) : Promise<boolean>{
        try {
            const newId = await this.nextId()
            Producer.id = newId
            const response = await this.getCollection().insertOne(Producer)
            if(!response || response.insertedCount < 1 ){
                throw Error("Invalid result while inserting a post ")
            }
            return true
        } catch (error) {
            console.log("Error ao inserir elemento no banco")
            console.log(error)
            throw error
        }
    }

    async nextId() : Promise<number> {
        try {
            const seqColl = await dbConnection.getDb().collection(config.db.collections.sequences)
            const result = await seqColl.findOneAndUpdate(
                { name: "Producer_id" },
                { $inc: { value: 1 } })

            if (result.ok) {
                return result.value.value as number
            }
            throw Error("Falha ao gerar id para o banco de dados")
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}