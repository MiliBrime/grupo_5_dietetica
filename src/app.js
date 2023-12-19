const express=require("express");
app=express();

const path = require("path");

app.use(express.static("public"));
app.use(express.static("views"));

app.set('view engine', 'ejs');

app.set("views", path.join(__dirname, "views")); 

const rutaHome = require("./routes/homeRouter")
app.use("/",rutaHome);

const productsRouter = require('./routes/productsRouter'); // Rutas /products
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
app.get("/detalleproducto", (req,res)=> {
    res.render("productDetail")
})

app.post("/register", (req,res)=> {
    res.sendFile(path.resolve(__dirname, "./views/home.html"));
})


app.listen(3010,()=> {
    console.log("servidor corriendo en http://localhost:3010");
})