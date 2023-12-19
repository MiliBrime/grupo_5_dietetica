const express=require("express");
const app=express();

const path = require("path");

const methodOverride = require('method-override'); // Para poder usar PUT y DELETE
app.use(methodOverride('_method')); 

app.use(express.static("public"));
app.use(express.static("views"));
app.use(express.json()); //para tomar los datos del body (del form)
app.use(express.urlencoded({extended: false})); //para manipular datos con form

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views")); 

const rutaHome = require("./routes/homeRouter");
app.use("/",rutaHome);

const productsRouter = require('./routes/productsRouter');
app.use('/products', productsRouter);


app.get("/login", (req,res)=> {
    res.render("login");
})

app.get("/carrito", (req,res)=> {
    res.render("carrito")
})
app.get("/register", (req,res)=> {
    res.render("register");
})
app.get("/loginsignup", (req,res)=> {
    res.render("loginsignup");
})

app.post("/register", (req,res)=> {
    res.sendFile(path.resolve(__dirname, "./views/home.html"));
})

app.listen(3010,()=> {
    console.log("servidor corriendo en http://localhost:3010");
})