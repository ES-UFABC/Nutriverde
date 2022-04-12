import * as dbConnection from "./db-connection"
import {config} from '../config'
import * as dbConnect from "./db-connection"
import { User } from "./user-model"

/**
 * Producer model
 */
export class Producer extends User {
    id: number
    name: string
    fantasyName: string
    email: string
    phones!: [string]

    // TODO:
    productionAddress!: {
        street: string;
        codeId: string;
        district: string;
        cep: string;
        county: string; }
    productionRegion!: string
    negotiateOnProductionSite!: boolean
        // TODO:
    businessAddress!: {
        street: string;
        codeId: string;
        district: string;
        cep: string;
        county: string; }

    businessIsCollective!: boolean
    geoReferencedLocalization!: { lat: number; lng: number; } 
    affiliatedEntities!: [string]
    cnpj!: string
    licensed!: boolean
    certificationsAndRecords!: [string]
    agroEcological!: boolean
    agroEcologicalCertifications!: [string]
    organic!: boolean
    externalWebPages!: [string]
    productionsClassification!: [string]
    [index:string]:any
    producerPaymentMehods: string[]
    
    
    constructor(name: string, password: string, phones: string[], email: string, 
                address : string[], cpf : string, fantasyName: string,
                producerPaymentMehods: string[] ) {

        super(name, password, phones, email, address, cpf);
        this.id = 0
        this.name = name
        this.email = email
        this.fantasyName = fantasyName
        this.producerPaymentMehods = producerPaymentMehods
        //this.productionAddress = productionAddress
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
        return 1 > 0 
    }
    /**
     * 
     * @param other 
     * @returns 
     */
    isEquals(other : Producer){
        return this.name === other.name && 
        this.email === other.email &&
        this.cpf === other.cpf
    }


    /**
     * Convert a JSON representation to an Producer instance
     * @param json the JSON representation
     * @returns the Producer instance
     */
    static decode(json: any): Producer {
    for (const prop of ["fantasyName"]) {
            if (!(prop in json)) {
                throw new Error(`Property ${prop} is required`)
            }
        }

        const producer = new Producer(json.name, json.password, json.phones, 
                                    json.email, json.address, json.cpf,
                                    json.fantasyName,
                                    json.producerPaymentMehods)

        Object.keys(json).forEach(key =>{
            // if(key in json)
                producer[key] = json[key]
        })

        if ("id" in json) {
            producer.id = parseInt(json.id)
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
        return dbConnection.getDb().collection(config.db.collections.users)
    }

    /**
     * Retrieve an Producer given its name
     * @param email the Producer email
     * @returns the Producer
     */
     async findByEmail(email: string): Promise<Producer> {
        try {
            const response = await this.getCollection().findOne({email: email})

            if (response) {
                return Producer.decode(response)
            }
            throw Error("Failed to retrieve Producer with given email")
        } catch (error) {
            console.log(error)
            console.error("Error while retrieving Producer")
            throw error
        }
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

    /**
     * Retrieve an Producer given its id
     * @param id the Producer id
     * @returns the Producer
     */
     async findById(id: number): Promise<Producer> {
        try {
            const response = await this.getCollection().findOne({id: id})

            if (response) {
                return Producer.decode(response)
            }
            throw Error("Failed to retrieve Producer with given id")
        } catch (error) {
            console.log(error)
            console.error("Error while retrieving Producer")
            throw error
        }
    }


    async update(Producer:Producer){
        try {
            const response = await this.getCollection().replaceOne(
                { id: Producer.id }, Producer)

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


    async removeById(id : number ){
        try {
            const response = await this.getCollection().deleteOne({id:id})
            return (response.deletedCount) ? response.deletedCount > 0 : false
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async listAll() : Promise<Producer[]>{
        try {
            const response = await this.getCollection().find( { fantasyName : { $exists : true } } ,
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
    async insert(producer : Producer) : Promise<boolean>{
        try {
            const newId = await this.nextId()
            producer.id = newId
            const response = await this.getCollection().insertOne(producer)
            if(!response || response.insertedCount < 1 ){
                throw Error("Invalid result while inserting a post ")
            }
            return true
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async nextId() : Promise<number> {
        try {
            const seqColl = await dbConnection.getDb().collection(config.db.collections.sequences)
            const result = await seqColl.findOneAndUpdate(
                { name: "user_id" },
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