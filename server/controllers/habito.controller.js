
const Habito = require("../models/habito.model");

module.exports.get_all = (req, res) => {
    Habito.find().sort({prioridad: 1})
    .then(habitos => res.json(habitos))
    .catch(err => {res.status(400).json(err)});
}

module.exports.get_habitos_days = (req, res) => {
    Habito.find().sort({prioridad: 1})
    .then(habitos => res.json(habitos))
    .catch(err => {res.status(400).json(err)});
}

module.exports.create_habito = (req,res) =>{//acá hago el loop para hacer varios habitos
    var name = "";
    var prioridad = "";
    var identificador = "";
    var dia = 0;
    var mes = 0;
    var identificador = "";
    var diaString = "";
    var objeto = {};
    var ano = req.body.ano;
    var check = req.body.check;
    console.log("backend");
    mes = req.body.mes;
        if(dia<10){
            diaString= "0"+dia.toString();
        }
        else{
            diaString= dia.toString();
        }
        identificador = diaString+mes.toString();
        for(let j = 0; j<req.body.nombres.length;j++){
            nombre = req.body.nombres[j];
            prioridad = req.body.prioridades[j];
            objeto = {nombre,prioridad,mes,dia,ano,check,identificador};
            console.log("Lo que debería de guardar");
            console.log(objeto);
            Habito.create(objeto)
            .then(habito => res.json({habito}))
            .catch(err =>{
                res.status(400).json(err);
            })
        }
    }

module.exports.get_habito = (req,res) => {
    Habito.findOne({identificador: req.params.identificador})
    .then(habito => res.json(habito))
    .catch(err => {res.status(400).json(err)});
}

module.exports.update_habito = (req,res) =>{
    Habito.findByIdAndUpdate({_id: req.params.id}, req.body, {new:true}, {runValidators:true})
    .then(habito => res.json(habito))
    .catch(err => {res.status(400).json(err)});
}

module.exports.delete_habito = (req, res) =>{
    Habito.deleteOne({_id: req.params.id})
    .then(result => res.json(result))
    .catch(err => {res.status(400).json(err)});
}