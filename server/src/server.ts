import e from "express";
import * as dbConnect from "./models/db-connection";
import { config } from "./config";
import multer from "multer";
import cors from "cors";

//import  passport from "passport"
//var GoogleStrategy = require('passport-google-oauth20').Strategy;

import * as breeder from "./models/mocker-populate";
import { ProductService } from "./services/product-service";
import { ProducerService } from "./services/producer-service";
import { UserService } from "./services/user-service";
import { FileService } from "./services/file-service";
import { ReviewService } from "./services/review-service";

/**
 * Configure session middleware
 */
const app = e();
const upload = multer();

app.use(e.json());
app.use(e.urlencoded({ extended: true })); // to use
app.use(cors());
//app.use(passport.initialize())

// credencials
app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/**
 * @Test
 * Products routes
 */
app.post(
  "/products",
  UserService.getInstance().auth,
  async (req: e.Request | any, res) => {
    req.body.producerId = req.user.id;
    await ProductService.getInstance().insert(req, res);
  }
);

app.get("/producers/:id/products", async (req, res) => {
  await ProductService.getInstance().findByProducerId(req, res);
});

/**
 * @Test
 * /my/products -> only works with a Producer P
 */
app.get(
  "/producers/products",
  UserService.getInstance().auth,
  async (req: any | e.Request, res) => {
    console.log(req.user);
    if (!req.user.isProducer) {
      res
        .status(401)
        .json({ items: [], message: "Unauthorized", isProducer: false });
    }
    req.body.producerId = req.user.id;
    await ProductService.getInstance().findByProducerId(req, res);
  }
);

app.get(
  "/products",
  async (req, res) => await ProductService.getInstance().listAll(req, res)
);

app.get(
  "/products/:id",
  async (req, res) => await ProductService.getInstance().findById(req, res)
);

app.get(
  "/products/search/:word",
  async (req, res) => await ProductService.getInstance().listAllByName(req, res)
);

/***
 * Files end point
 */
app.post("/files", upload.single("file"), FileService.getInstance().create);
app.get("/files/:filename", FileService.getInstance().get);

/**
 * Producers routes
 */
app.get("/producers", async (req, res) => {
  await ProducerService.getInstance().listAll(req, res);
});

/**
 * User to Producer Form...
 * @Test
 */
app.put("/producers", UserService.getInstance().auth, async (req, res) => {
  await ProducerService.getInstance().insert(req, res);
});

app.get("/producers/:id", async (req, res) => {
  await ProducerService.getInstance().findById(req, res);
});

/**
 * Users routes
 */
app.get(
  "/users/:id",
  async (req, res) => await UserService.getInstance().findById(req, res)
);
// TODO:
app.get("/mocker", async (req, res) => {
  await breeder.add(req, res);
});

app.put("/register", async (req, res) => {
  console.log("Estou registrando");
  await UserService.getInstance().insert(req, res);
});

app.put("/login", async (req, res) => {
  await UserService.getInstance().loginProcessing(req, res);
});

app.get(
  "/me/",
  UserService.getInstance().auth,
  async (req: e.Request | any, res) => {
    console.log("user:   ", req.user);
    req.body = req.user;
    await UserService.getInstance().findById(req, res);
    //res.status(200).json({user:req.user})
  }
);

//Sessão de Reviews

app.get("/products/:id/reviews", async (req, res) => {
  await ReviewService.getInstance().findByProductId(req, res);
});
app.post(
  "/products/:id/reviews",
  UserService.getInstance().auth,
  async (req: any, res) => {
    req.body.producerId = req.user.id;
    await ReviewService.getInstance().insert(req, res);
  }
);
// passport.use(new GoogleStrategy({
//   clientID:  process.env.GOOGLE_API_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_API_CLIENT_SECRET,
//   callbackURL: process.env.GOOGLE_API_REDIRECT,
//   passReqToCallback: true,
//   session: false
// },
// function(request: any, accessToken: any, refreshToken: any, profile: any, done: (arg0: null, arg1: any) => any) {
//   console.log("req ", request)
//   console.log("Access token", accessToken)
//   console.log("Refress", refreshToken)
//   console.log("profile", profile)

//   // CHECK IF EMAIL MATCH return JWT
//   // se nao, cria uma conta

//   return done(null, profile);
// }));

// app.get('/google', (req, res) => {
//   res.send('<a href="/auth/google">Authenticate with Google</a>');
// });

// app.get('/auth/google',
//   passport.authenticate('google', { session: false ,scope: [ 'email', 'profile' ] }
// ));

// app.get('/login-google',
//   passport.authenticate( 'google', {
//     session: false,
//     successRedirect: '/producers',
//     failureRedirect: '/auth/google/failure'
//   })
// );

// app.get('/auth/google/failure', (req, res) => {
//   res.send('Failed to authenticate..');
// });

/**
 * Server stack set-up
 */
console.log("Starting server stack...");
dbConnect
  .connect()
  .then(() => {
    app.listen(config["server-port"], () => {
      console.log(`Server listening at ${config["server-port"]}`);
    });
  })
  .catch((error) => {
    console.error("Failed to load server stack");
    console.error(error.stack);
  });

/**
 * Server stack tear-down
 */

process.on("exit", (code) => {
  console.log(`Server exiting with code ${code}`);
});
function exitHandler() {
  dbConnect
    .disconnect()
    .then(() => process.exit())
    .catch((error) => {
      console.error("Failed to shutdown server stack");
      console.error(error.stack);
    });
}
process.once("SIGINT", exitHandler);
process.once("SIGUSR2", exitHandler);
function err(err: any, profile: { id: any }) {
  throw new Error("Function not implemented.");
}
