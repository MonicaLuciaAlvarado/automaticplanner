const mongoose = require("mongoose");

const EsquemaHabito = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "The name is obligatory"],
    },
    prioridad: {
        type: Number,
        default: 50
    },
    mes: {
        type: Number,
        required: [true, "The month is obligatory"],
    },
    dia: {
        type: Number,
        required: [true, "The day is obligatory"],
    },
    ano: {
        type: Number,
        default: 2023
    },
    check: {
        type: Boolean,
        default: false
    },
    identificador: {
        type: String
    }
}, {timestamps: true, versionKey: false});

const Habito = mongoose.model("habitos", EsquemaHabito);
module.exports=Habito;