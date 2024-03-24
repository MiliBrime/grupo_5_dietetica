const express = require("express");
const app = express();

const path = require("path");

const cookieParser = require('cookie-parser');

/* let bcrypt = require("bcryptjs")
 *///bcript.hashSync(“variable del texto q queremos encriptar”, sal)

const methodOverride = require('method-override'); // Para poder usar PUT y DELETE
app.use(methodOverride('_method'));

app.use(express.json()); //para tomar los datos del body (del form)
app.use(express.urlencoded({ extended: false })); //para manipular datos con form

const session = require("express-session");
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));

app.use(cookieParser());

const userLoggedMiddleware = require("./middlewares/userLogged");
app.use(userLoggedMiddleware);

app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'views', 'products'),
  path.join(__dirname, 'views', 'users'),
]);

app.use(express.static("public"));
app.use(express.static("views"));

const rutaHome = require("./routes/homeRouter");
app.use("/", rutaHome);

const productsRouter = require('./routes/productsRouter');
app.use('/products', productsRouter);

const usersRouter = require('./routes/usersRouter');
app.use("/users", usersRouter);

const usersAPIRouter = require('./routes/usersAPIRouter');
app.use("/api", usersAPIRouter);

const productsAPIRouter = require('./routes/productsAPIRouter');
app.use('/api', productsAPIRouter)

app.listen(3010, () => {
  console.log("servidor corriendo en http://localhost:3010");
})