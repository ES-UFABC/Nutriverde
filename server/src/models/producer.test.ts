/**
 * testing the tests
 */

 import {describe} from "mocha"
 import {strict as assert} from "assert"
 import * as dbConnect from "./db-connection";
 import * as model from "./producer-model"
 
 describe("Model layer tests", () => {
     describe("Test DAO", () => {
         const dao = model.ProducerDAO.getInstance()
     
         before(async () => await dbConnect.connect())
     
         after(async () => await dbConnect.disconnect())
     
         it("List all should return at least one element", async () => {
             const result = await model.ProducerDAO.getInstance().listAll()
             //console.log(result)
             assert.equal(result.length > 1, true, "No element was returned")
         })
     
         it("Insert should be successfull", async () => {
             const producer = new model.Producer(
                "name","paymentMethods","fantasyname","email"
             )
     
             try {
                 await dao.insert(producer)
             } catch(error) {
                 console.error(error)
                 assert.fail("Insert should not throw error")
             }
         })
     
         it("Insert should increase quantity of elements", async () => {
             const itemsBefore = await dao.listAll()
             const producer = new model.Producer(
                "name","paymentMethods","fantasyname","email"
             )
     
             await dao.insert(producer)
     
             const itemsAfter = await dao.listAll()
     
             assert.equal(itemsAfter.length - itemsBefore.length, 1, "Quantity out of expected")
         })
         
         /**
          *          it("Retrieved element is equal to inserted element", async () => {
             const producer = new model.Producer(
                "retrive-name","retrive-paymentMethods","retrive-fantasyname","retrive-email"
             )
     
     
             const response = await dao.insert(producer)
             const retrProducer = await dao.findByname(producer.name)
                
             //console.log(producer)
             //console.log(producer.isEquals(retrProducer))
             assert.equal(producer.isEquals(retrProducer), true, "Items are not equal")
         })
          */

         
         

         
         it("Remove should decrease quantity of elements", async () => {
             const before = await dao.listAll()
     
             if (before.length < 1) {
                 throw new Error("Not enough elements to perform the test")
             }
     
             const status = await dao.removeByname(before[0].name)
     
             assert.equal(status, true, "Remove should be successfull")
     
             const after = await dao.listAll()
     
             assert.equal(before.length - after.length, 1, "Quantity not decreased")
         })
     
         it("Valid id should return a valid element", async () => {
             const allElements = await dao.listAll()
     
             for (const el of allElements) {
                 const retrEl = await dao.findById(el.id)
     
                 assert.equal(el.isEquals(retrEl), "Producers does not match")
             }
         })
     
         it("Invalid id should return no element", async () => {
             try {
                 await dao.findById(-1)
                 assert.fail("Id -1 should return no element")
             } catch(err) {}
         })
     
         it("Update with valid id is successfull", async () => {
             const items = await dao.listAll()
     
             assert.equal(items.length > 1, true, "Impossible to update an empty collection")
             
             const item = await dao.findById(items[0].id)
     
             assert.equal(await dao.update(item), true)
         })
     
         it("Update with invalid id is unsuccessfull", async () => {        
            const producer = new model.Producer(
                "update-name","update-paymentMethods","update-fantasyname","update-email"
             )
     
             producer.id = -1
             assert.equal(await dao.update(producer), false)
         })
     
         it("Update changes data", async () => {
             const items = await dao.listAll()
     
             assert.equal(items.length > 1, true, "Impossible to update an empty collection")
             
             const item = await dao.findById(items[0].id) // get some random data

             /** 
                           const producer = new model.Producer(
                "update-name","update-paymentMethods","update-fantasyname","update-email"
             )
     
             assert.notEqual(item.name, producer.name, "Name should differ")
             assert.notEqual(item.fantasyName, producer.fantasyName, "FantasyNName should differ")
             assert.notEqual(item.email, producer.email, "Email should differ")
             assert.notEqual(item.paymentMethods, producer.paymentMethods, "PaymentMehods should differ")
             */

             
             
             item.name = "mudei o nome"

             await dao.update(item)
     
             const retrItem = await dao.findById(item.id)
     
             assert.equal(retrItem.name, item.name , "Updated name does not match expected value")
     
         })
     
         it("Remove should decrease quantity of elements", async () => {
             const itemsBefore = await dao.listAll()
     
             assert.equal(before.length > 1, true, "Impossible to update an empty collection")
             
             const item = await dao.removeById(itemsBefore[0].id)
             const itemsAfter = await dao.listAll()
     
             assert.equal(itemsBefore.length - itemsAfter.length, 1, "Resulting quantity out of expected")
         })
     })
 })
 
 