const express=require("express");
app=express();

const path = require("path");

app.listen(3010,()=> {
    console.log("servidor corriendo en http://localhost:3010");
})

app.get("/login", (req,res)=> {
    res.sendFile(path.resolve(__dirname, "./views/login.html"));
})