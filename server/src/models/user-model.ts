import * as dbConnection from "./db-connection"
import { config } from '../config'
import * as dbConnect from "./db-connection"

/**
 * User model
 * 
 */
export class User {
    id: number
    name: string
    password: string
    email: string
    phones: string[]
    cpf: string
    address: string[]
    userPaymentMethods?: string

    constructor(name: string, password: string, phones: string[], email: string, address: string[], cpf: string) {
        this.id = 0
        this.name = name
        this.password = password
        this.email = email
        this.phones = phones
        this.address = address
        this.cpf = cpf
    }

    isValid() {
        return this.name.length > 0 && this.email.length > 0
            && this.address[0].length > 0 && this.cpf.length > 0
            && this.name.length > 0 && this.phones[0].length > 0
            && this.password.length > 0
    }
    /**
     * 
     * @param other 
     * @returns 
     */
    isEquals(other: User) {
        return this.name === other.name &&
            this.userPaymentMethods === other.userPaymentMethods &&
            this.email === other.email
    }


    /**
     * Convert a JSON representation to an User instance
     * @param json the JSON representation
     * @returns the User instance
     */
    static decode(json: any): User {
        for (const prop of ["email", "name", "password", "phones", "address", "cpf"]) {
            if (!(prop in json)) {
                throw new Error(`Property ${prop} is required`)
            }
        }

        const user = new User(json.name, json.password, json.phones, json.email, json.address, json.cpf)

        if ("id" in json) {
            user.id = parseInt(json.id)
        }
        return user
    }
}

/**
 * User DAO Singleton
 */
export class UserDAO {
    private static instance: UserDAO

    private constructor() { }

    static getInstance() {
        if (!this.instance) {
            this.instance = new UserDAO()
        }
        return this.instance
    }

    getCollection() {
        return dbConnection.getDb().collection(config.db.collections.users)
    }

    /**
     * Retrieve an User given its name
     * @param email the User email
     * @returns the User
     */
    async findByEmail(email: string): Promise<User> {
        try {
            const response = await this.getCollection().findOne({ email: email })

            if (response) {
                return User.decode(response)
            }
            throw Error("Failed to retrieve User with given email")
        } catch (error) {
            console.log(error)
            console.error("Error while retrieving User")
            throw error
        }
    }

    /**
     * Retrieve an User given its name
     * @param name the User name
     * @returns the User
     */
    async findByname(name: string): Promise<User> {
        try {
            const response = await this.getCollection().findOne({ name: name })

            if (response) {
                return User.decode(response)
            }
            throw Error("Failed to retrieve User with given name")
        } catch (error) {
            console.error("Error while retrieving User")
            throw error
        }
    }

    /**
     * Retrieve an User given its id
     * @param id the User id
     * @returns the User
     */
    async findById(id: number): Promise<User> {
        try {
            console.log("id:::::",id)
            const response = await this.getCollection().findOne({ id: id, fantasyName: { $exists: false } })
            console.log("respond>>>", response)
            if (response) {
                return User.decode(response)
            }
            throw Error("Failed to retrieve User with given id")
        } catch (error) {
            console.log(error)
            console.error("Error while retrieving User")
            throw error
        }
    }


    async update(User: User) {
        try {
            const response = await this.getCollection().replaceOne(
                { id: User.id }, User)

            return (response) ? response.modifiedCount > 0 : false
        } catch (error) {

        }
    }
    async removeByname(name: string) {
        try {
            const response = await this.getCollection().deleteOne({ name: name })
            return (response.deletedCount) ? response.deletedCount > 0 : false
        } catch (error) {
            console.log(error)
            throw error
        }
    }


    async removeById(id: number) {
        try {
            const response = await this.getCollection().deleteOne({ id: id })
            return (response.deletedCount) ? response.deletedCount > 0 : false
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    /***
     * @deprecated
     */
    async listAll(): Promise<User[]> {
        try {
            const response = await this.getCollection().find({},
                { projection: { _id: 0 } }
            ).toArray() || []
            if (response) {
                return response as User[]
            }
            throw Error("Erro na opreação de listagem de Autores")
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async insert(User: User): Promise<boolean> {
        try {
            const newId = await this.nextId()
            User.id = newId
            const response = await this.getCollection().insertOne(User)
            if (!response || response.insertedCount < 1) {
                throw Error("Invalid result while inserting a post ")
            }
            return true
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async nextId(): Promise<number> {
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