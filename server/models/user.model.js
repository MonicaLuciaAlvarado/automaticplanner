const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const EsquemaUsuario = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Name obligatory"]
    },
    lastName: {
        type: String,
        required: [true, "Last Name obligatory"]
    },
    email: {
        type: String,
        required: [true, "E-mail obligatory"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Add a valid email"
        },
        unique:true
    },
    password: {
        type: String,
        required: [true, "Password obligatory"],
        minlength: [8, "Password must have at least 8 characters"]
    },
    creator: {
        type: String
    }
}, {timestamps: true, versionKey: false})

//Se realiza cuando no queremos guardarlo en BD
EsquemaUsuario.virtual('confirmPassword')
    .get(()=> this._confirmPassword)
    .set(value => this._confirmPassword = value)

//Se hace ANTES de validar el esquema del usuario
EsquemaUsuario.pre('validate', function(next){
    if(this.password !== this.confirmPassword){
        this.invalidate('confirmPassword', 'Las contraseñas no coinciden');
    }
    next();//valida
})

//Antes de guardar ususario, encriptamos la contraseña
EsquemaUsuario.pre('save', function(next){
    bcrypt.hash(this.password, 10)
    .then(hash =>{
        this.password = hash;
        next();
    });
});

const Usuario = mongoose.model("usuarios", EsquemaUsuario);
module.exports = Usuario;