
const jwt = require("jsonwebtoken");
const secret_key = "Esta es mi llave secreta";
const Habito = require("../models/habito.model");

module.exports.get_all = (req, res) => {
    usertoken_decoded = jwt.verify(req.cookies.usertoken, secret_key);
    Habito.find({creator:usertoken_decoded._id}).sort({prioridad: 1})
    .then(habitos => res.json(habitos))
    .catch(err => {res.status(400).json(err)});
}
module.exports.create_habito = (req,res) =>{//acá hago el loop para hacer varios habitos
    var prioridad = "";
    var identificador = "";
    var dia = 0;
    var mes = 0;
    var identificador = "";
    var diaString = "";
    var objeto = {};
    var ano = req.body.ano;
    var check = req.body.check;
    var todosErrors = [];
    var errorDays= "no";
    var errorMonth="no";
    var contador = 0;
    var creator = "";
    var nuevaLista = false;
    mes = req.body.mes;
    usertoken_decoded = jwt.verify(req.cookies.usertoken, secret_key);
    if (mes===undefined){
        nuevaLista=true;
        errorMonth="The month is obligatory";
            for(let j = 0; j<req.body.nombres.length;j++){
                if(req.body.nombres[j]!=""){
                    todosErrors[contador]="no";
                }
                else{
                    todosErrors[contador]="The name is obligatory";
                    nuevaLista=true;
                }
                contador++;
            }
        if(req.body.diasExportar.length===0){
            errorDays="You must create a date by selecting the month, adding the incial, final date and days of the week";
        }
    }
    else if(req.body.diasExportar.length===0){
        nuevaLista=true;
        errorDays="You must create a date by selecting a month, adding the incial, final date and days of the week";
            for(let j = 0; j<req.body.nombres.length;j++){
                if(req.body.nombres[j]!=""){
                    todosErrors[contador]="no";
                }
                else{
                    todosErrors[contador]="The name is obligatory";
                    nuevaLista=true;
                }
                contador++;
            }
    }
    else{
        for(let i = 0; i<req.body.diasExportar.length;i++){
            for(let j = 0; j<req.body.nombres.length;j++){
                if(req.body.nombres[j]!=""){
                    todosErrors[contador]="no";
                }
                else{
                    todosErrors[contador]="The name is obligatory";
                    nuevaLista=true;
                }
                contador++;
            }
        }
        for(let i = 0; i<req.body.diasExportar.length;i++){
            dia = req.body.diasExportar[i];
            if(dia<10){
                diaString= "0"+dia.toString();
            }
            else{
                diaString= dia.toString();
            }
            identificador = diaString+mes.toString();
            for(let j = 0; j<req.body.nombres.length;j++){
                nombre = req.body.nombres[j];
                console.log("los nombres son:");
                console.log(typeof(dia));
                prioridad = req.body.prioridades[j];
                objeto = {nombre,prioridad,mes,dia,ano,check,identificador,creator};
                objeto.creator = usertoken_decoded._id;
                if(nuevaLista===false){
                    Habito.create(objeto)
                    .then(habito => {console.log(habito)})
                    .catch(err =>{
                        console.log(err);
        //              errors[j]=err.response.data.errors;
        //              res.status(400).json(err);
                    })
                }
            }
        }
    }
    var conjuntoErrores = {nombres:todosErrors,mes:errorMonth,dias:errorDays};
    if(nuevaLista===true){
        console.log("los errores son: ");
        console.log(conjuntoErrores);
        res.status(400).json(conjuntoErrores);
    }
    else{
        console.log("Habitos guardados");
        res.json("Habitos guardados");
    }
    }

module.exports.get_habito = (req,res) => {
    Habito.findOne({identificador: req.params.identificador})
    .then(habito => res.json(habito))
    .catch(err => {res.status(400).json(err)});
}

module.exports.update_habito = (req,res) =>{
    var id = "";
    var check = {check:false};
    for(let i = 0; i<req.body.arrayIdExportar.length; i++){
        check.check = req.body.arrayChecksExportar[i];
        id = req.body.arrayIdExportar[i];
        Habito.findByIdAndUpdate({_id: id}, check, {new:true}, {runValidators:true})
        .then(habito => console.log(habito))
        .catch(err => {res.status(400).json(err)});
    }
    res.json("Habitos actualizados");
}

module.exports.delete_habito = (req, res) =>{
    Habito.deleteOne({_id: req.params.id})
    .then(result => res.json(result))
    .catch(err => {res.status(400).json(err)});
}