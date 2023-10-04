const express = require("express");
const app = express();
const cookieParser= require("cookie-parser");

const cors = require("cors");

app.use(express.json(), express.urlencoded({extended:true}));

//Para usar cookies
app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:3000",
        //Credenciales
        credentials: true
    })
)

require("./server/config/mongoose.config")
require("./server/config/mongoose.config")

const misRutas = require("./server/routes/habito.routes")
misRutas(app);

app.listen(8000, ()=>console.log("Servidor listo!"));