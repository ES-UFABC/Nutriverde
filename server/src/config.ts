import * as path from "path";

export const config = {
  "server-port": process.env.PORT || 3000,
  db: {
    url: "mongodb://localhost:27017",
    name: "NutriVerde",
    collections: {
      users: "users",
      products: "products",
      sequences: "sequences",
      sessions: "sessions",
      vendas: "vendas",
    },
  },
  upload_dir: path.resolve(__dirname, "..", "uploads"),
  secret: "c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2",
};
