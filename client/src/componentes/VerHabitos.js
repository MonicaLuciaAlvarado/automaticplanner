import React, {useEffect, useState} from "react";
import axios from 'axios';
import { useParams, Link, useNavigate } from "react-router-dom";
import './Ver.css';

const VerHabitos = () =>{
    const {ide} = useParams();
    const [losHabitos, setLosHabitos] =useState([]);
    const [arrayIdentificadores, setArrayIdentificadores] = useState([]);
    const [arrayChecks, setArrayChecks] = useState([]);
    const [arrayNames, setArrayNames] = useState([]);
    const [arrayId, setArrayId] = useState([]);
    const [cont, setCont] = useState(0);
    const [arrayIdExportar, setArrayIdExportar] = useState([]);
    const [arrayChecksExportar, setArrayChecksExportar] = useState([]);
    const [idBorrar, setIdBorrar] = useState([]);

    const navigate = useNavigate();

    var habitos = [];
    var aChecks=[];
    var aNames=[];
    var aId=[];
    var identificadores = [];
    var contador=0;
    var id = "";
    var largo = arrayId.length;
    var aNames2 = [];
    var identificadores2 = [];
    var aChecks2 = [];
    var aId2 = [];
    var idExportar = [];
    var checksExportar = [];
    var idBo = [];

    useEffect(() => {
        axios.get("http://localhost:8000/api/habitos", {withCredentials:true})
        .then(res => {setLosHabitos(res.data);
        })
        .catch(err => console.log(err));
        console.log("primero primera vez")
    },[]);

    useEffect(()=>{
        habitos=losHabitos;
        for(let i = 0; i<losHabitos.length;i++){
            aChecks=[...aChecks,habitos[i].check];
        }
        setArrayChecks(aChecks);
        for(let i = 0; i<losHabitos.length;i++){
            aId=[...aId,habitos[i]._id];
        }
        setArrayId(aId);
        for(let i = 0; i<losHabitos.length;i++){
            identificadores=[...identificadores,habitos[i].identificador];
        }
        setArrayIdentificadores(identificadores);
        for(let i = 0; i<losHabitos.length;i++){
            aNames=[...aNames,habitos[i].nombre];
        }
        setArrayNames(aNames);
        for(let i = 0; i<losHabitos.length;i++){
            if(habitos[i].identificador===ide){
                idExportar=[...idExportar,habitos[i]._id]
            }
        }
        setArrayIdExportar(idExportar);
        for(let i = 0; i<losHabitos.length;i++){
            if(habitos[i].identificador===ide){
                checksExportar=[...checksExportar,habitos[i].check]
            }
        }
        setArrayChecksExportar(checksExportar);

        for(let i = 0; i<losHabitos.length;i++){
            if(ide===identificadores[i]){
                idBo=[...idBo,habitos[i]._id];
            }
        }
        setIdBorrar(idBo);
        //Hago array con valores de check con la cantidad de objetos que imprimo//
        //Hago array con valores de _id con la cantidad de objetos que imprimo//
        //Hago array con valores con nombres con la cantidad de objetos que imprimo//
    },[losHabitos])

    useEffect(()=>{
        console.log("cambió los checks")
    }, [cont])

    const cambiarCheck = (e,index) =>{
        aChecks=arrayChecks;
        console.log("inicial");
        console.log(aChecks[index]);
        aChecks[index] = !aChecks[index];
        setArrayChecks(aChecks);
        console.log(aChecks[index]);
        aId=arrayId;
        idExportar=arrayIdExportar;
        checksExportar=arrayChecksExportar;
        for(let i=0;i<idExportar.length;i++){
            if(idExportar[i]===aId[index]){
                checksExportar[i]=aChecks[index];
            }
        }
        setArrayChecksExportar(checksExportar);
        contador=cont;
        contador++;
        setCont(contador);
        console.log(contador);
        }

        const actualizar = (e) =>{
            console.log(arrayIdExportar);
            console.log(arrayChecksExportar);
            e.preventDefault();
            axios.put("http://localhost:8000/api/habitos/",{
                arrayIdExportar,
                arrayChecksExportar
            }, {withCredentials: true})
            .then(res => navigate("/"))
            .catch(err=> console.log(err));
        }

        const borrar = index => {
            if(window.confirm("Are you sure?")===true){
                id = arrayId[index];
                largo = arrayId.length;
                aNames = [];
                identificadores = [];
                aChecks = [];
                aId = [];
                aNames2 = arrayNames;
                identificadores2 = arrayIdentificadores;
                aChecks2 = arrayChecks;
                aId2 = arrayId;
                axios.delete("http://localhost:8000/api/habitos/"+id, {withCredentials:true})
                .then(res =>{
                    for (let i=0; i<largo; i++){
                        if(i!==index){
                            aNames=[...aNames,aNames2[i]];
                            identificadores=[...identificadores,identificadores2[i]];
                            aChecks = [...aChecks,aChecks2[i]];
                            aId = [...aId, aId2[i]]
                        }
                        else{}
                    }
                    setArrayNames(aNames);
                    setArrayIdentificadores(identificadores);
                    setArrayChecks(aChecks);
                    setArrayId(aId);
                })
                .catch(err=>console.log(err))
            }
            else{

            }
        }
    return(
        <div className="verlos">
            <Link to = "/" className="irCalendario">Go to Calendar</Link>
            <form onSubmit={actualizar}>
                <div className="formularioActualizar">
                <div className="desplegarhabitos">
                    {arrayNames.map((nombre,index)=>(
                        <div key={index}>
                            {
                            ide===arrayIdentificadores[index]?
                            <div className="cadauno">
                                <div className="losnombrecitos">
                                    <h1 className="habitomodificar">{nombre}</h1>
                                    <div>
                                    <input type="checkbox" id={`check${index}`} name={`check${index}`} checked={arrayChecks[index]} onChange={(e) => cambiarCheck(e, index)}/>
                                    <label htmlFor={`check${index}`} className="checkear">State</label>
                                    </div>
                                </div>
                                <button onClick={() => borrar(index)} className="erase">Delete</button>
                            </div>
                            :null
                            }
                        </div>
                    ))}
                </div>
                <input type='submit' value="Update" className="seActualiza"/>
                </div>
            </form>
        </div>
    )
}
export default VerHabitos;

