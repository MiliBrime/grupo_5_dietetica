const express=require("express");
const app=express();

const path = require("path");

const methodOverride = require('method-override'); // Para poder usar PUT y DELETE
app.use(methodOverride('_method')); 

app.use(express.json()); //para tomar los datos del body (del form)
app.use(express.urlencoded({extended: false})); //para manipular datos con form

app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname, 'views'),
    path.join(__dirname, 'views', 'products'),
    path.join(__dirname, 'views', 'users'),
  ]);

app.use(express.static("public"));
app.use(express.static("views"));


const rutaHome = require("./routes/homeRouter");
app.use("/",rutaHome);

const productsRouter = require('./routes/productsRouter');
app.use('/products', productsRouter);

const usersRouter = require('./routes/usersRouter');
app.use("/users", usersRouter);


app.listen(3010,()=> {
    console.log("servidor corriendo en http://localhost:3010");
})