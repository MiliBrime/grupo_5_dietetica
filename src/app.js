const express=require("express");
app=express();

const path = require("path");

app.use(express.static("public"));
app.use(express.static("views"));

app.set('view engine', 'ejs');

app.set("views", path.join(__dirname, "views")); 

app.listen(3010,()=> {
    console.log("servidor corriendo en http://localhost:3010");
})

app.get("/", (req,res)=> {
    res.render("home")
})

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
