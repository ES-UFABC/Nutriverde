import {config} from '../config'
import * as dbConnect from "./db-connection"

/**
 * Blog Product model
 * A Product must have a single unitOfMeas
 */
export class Product {
    id: number
    name: string
    unitOfMeas: string // the unitOfMeas username
    typology: string
    price: number
    specialDeliveryConditions: string
    quantity : number
    cover: string
    producerId: number

    constructor(name: string, unitOfMeas: string,
        typology: string, specialDeliveryConditions: string , quantity : number,producerId: number) {
        this.id = 0
        this.name = name
        this.unitOfMeas = unitOfMeas
        this.typology = typology
        this.price = 0
        this.specialDeliveryConditions = specialDeliveryConditions
        this.cover = ""
        this.quantity = quantity
        this.producerId = producerId
    }

    isValid(): boolean {
        return this.name.length > 0 && this.unitOfMeas.length > 0
            && this.typology.length > 0 && this.specialDeliveryConditions.length > 0
    }

    /**
     * Convert a JSON representation to a Product instance
     * @param json the json representation
     * @returns the Product instance
     */
    static decode(json: any): Product {
        for (const prop of ["name", "unitOfMeas", "typology", "specialDeliveryConditions"]) {
            if (!(prop in json)) {
                throw new Error(`Field ${prop} is required`)
            }
        }

        const product = new Product(
            json.name, 
            json.unitOfMeas, 
            json.typology, 
            json.specialDeliveryConditions,
            json.quantity,
            parseInt(json.producerId))

        if ("id" in json) {
            product.id = parseInt(json.id)
        }
        if ("cover" in json) {
            product.cover = json.cover
        }
        if ("price" in json) {
            product.price = json.price
        }

        return product
    }
}

/**
 * Blog Product DAO Singleton
 */
export class ProductDAO {
    private static instance: ProductDAO

    private constructor() { }

    private getCollection() {
        return dbConnect.getDb().collection(config.db.collections.products)
    }

    static getInstance(): ProductDAO {
        if (!ProductDAO.instance) {
            ProductDAO.instance = new ProductDAO()
        }

        return ProductDAO.instance
    }

    /**
     * Insert a new Product
     * @param Product the Product
     */
    async insert(Product: Product): Promise<boolean> {
        try {
            Product.id = await this.nextId()
            const response = await this.getCollection().insertOne(Product)

            if(!response || response.insertedCount < 1 ){
                throw Error("Invalid result while inserting a Product ")
            }
            return true
        } catch (error) {
            console.error("Falha ao inserir elemento")
            throw error
        }
    }

    /**
     * List all Products
     */
    async listAll(): Promise<Product[]> {
        try {
            return this.getCollection().find( 
                {},{ projection : {_id : 0 }}).toArray() || [] 
        } catch (error) {
            console.error("Falha ao listar os Products")
            throw error
        }
    }


    /**
     * search and List all Products that match
     */
     async searchAndList(name:String): Promise<Product[]> {
        try {
            return this.getCollection().find( 
                {name:name},{ projection : {_id : 0 }}).toArray() || [] 
        } catch (error) {
            console.error("Falha ao listar os Products")
            throw error
        }
    }

    /**
     * Find Product using its id
     * @param id the Product id
     */
    async findById(id: number): Promise<Product> {
        try {
            const response = await this.getCollection().findOne(
                {id: id}, 
                {projection: {_id: 0}}
            )
            if(response){
                return response as Product
            }
            throw Error("Erro ao buscar por elemento")
        } catch (error) {
            console.error("Failed to find item by id")
             throw error
        }
    }

    /**
     * Find Product using its Producer id
     * @param id the Product Producer id
     */
         async findByProducerId(id: number): Promise<Product[]> {
            try {
                console.log( "model: id= %d: %s", id, typeof id)
                const response = await this.getCollection().find(
                    { producerId: id }
                ).toArray() || [] 
                if(response){
                    return response as Product[]
                }
                throw Error("Erro ao buscar por elemento")
            } catch (error) {
                console.error("Failed to find item by id")
                 throw error
            }
        }
    /**
     * Uptypology the given Product in the database
     * (Assumes the Product id already exists)
     * @param Product the Product
     */
    async update(Product: Product): Promise<boolean> {
        try {
            const response = await this.getCollection().replaceOne(
                { id: Product.id }, Product)

            return (response) ? response.modifiedCount > 0 : false
        } catch (error) {
            console.error("Failed to uptypology element")
            throw error
        }
    }

    /**
     * Remove the Product with the given id.
     * @param id the id
     */
    async removeById(id: number): Promise<boolean> {
        try {
            const response = await this.getCollection().deleteOne({ id: id }, {})

            return (response.deletedCount) ? response.deletedCount > 0 : false
        } catch (error) {
            console.error("Failed to remove element")
            throw error
        }
    }

    /**
     * Generate a new Product id using a db sequence.
     */
    async nextId(): Promise<number> {
        try {
            const seqColl = dbConnect.getDb()
                .collection(config.db.collections.sequences)
            const result = await seqColl.findOneAndUpdate(
                { name: "product_id" },
                { $inc: { value: 1 } })

            if (result.ok) {
                return result.value.value as number
            }

            throw Error("Failed to create new id in the database")
        } catch (error) {
            console.error("Failed to generate a new id")
            throw error
        }
    }
}
