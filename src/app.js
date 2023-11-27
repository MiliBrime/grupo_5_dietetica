const express=require("express");
app=express();

const path = require("path");

app.use(express.static("public"));
app.use(express.static("views"));


app.listen(3010,()=> {
    console.log("servidor corriendo en http://localhost:3010");
})

app.get("/login", (req,res)=> {
    res.sendFile(path.resolve(__dirname, "./views/login.html"));
})

app.get("/carrito", (req,res)=> {
    res.sendFile(path.resolve(__dirname, "./views/carrito.html"));
})