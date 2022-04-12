import * as path from "path"

export const config = {
    "server-port": process.env.PORT || 3000,
    "db": {
        "url": "mongodb://localhost:27017",
        "name": "NutriVerde", 
        "collections": {
            "users": "users",
            "products": "products",
            "sequences": "sequences",
            "sessions": "sessions",
            "vendas":"vendas"
        }
    }, 
    "upload_dir": path.resolve(__dirname, "..", "uploads"),
    "secret": "ff743fb0dc08ee859d8a854157e6c54c"
}
