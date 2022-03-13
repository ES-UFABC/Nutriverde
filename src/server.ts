import e from 'express'
import path from 'path'
import hbs from "express-handlebars"
import {multipartyExpress as multiparty, cleanup} from "multiparty-express"
import session from "express-session"
import flash from "express-flash"


const app = e()




app.get("/", (req, res) => {
    res.send('Hello World!')
})

/**
 *  Rota padrão (midleware sem caminho), lidando com recursos inexistentes no servidor
 */
app.use((req,res)=>{
    res.status(404)
    res.render("error",{
        type : "404"
    })
})


app.listen(3000, () => {
    console.log(`Server listening at 3000`)
})

