import React, {useEffect, useState} from "react";
import axios from 'axios';
import { useParams, Link } from "react-router-dom";

const VerHabitos = () =>{
    const {ide} = useParams();
    const [losHabitos, setLosHabitos] =useState([]);
    const [arrayIdentificadores, setArrayIdentificadores] = useState([]);
    const [arrayChecks, setArrayChecks] = useState([]);
    const [arrayNames, setArrayNames] = useState([]);
    const [arrayId, setArrayId] = useState([]);

    var habitos = [];
    var aChecks=[];
    var aNames=[];
    var aId=[];
    var identificadores = [];
            //axios.put("http://localhost:8000/api/habitos/"+identificador,{
            //    check,
            //})
            //.then(res => console.log(res))
            //.catch(err=> console.log(err));

    useEffect(() => {
        axios.get("http://localhost:8000/api/habitos")
        .then(res => {setLosHabitos(res.data)})
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
        //Hago array con valores de check con la cantidad de objetos que imprimo//
        //Hago array con valores de _id con la cantidad de objetos que imprimo//
        //Hago array con valores con nombres con la cantidad de objetos que imprimo//
    },[arrayNames])
    useEffect(()=>{
        setArrayChecks(arrayChecks);
    }, [arrayChecks])

    const cambiarCheck = (e,index) =>{
        e.preventDefault();
        aChecks=arrayChecks;
        console.log("inicial");
        console.log(aChecks[index]);
        if(aChecks[index]===true){
            aChecks[index]=false;
            setArrayChecks(aChecks);
        }
        else{
            aChecks[index]=true;
            setArrayChecks(aChecks);
        }
        console.log("final");
        console.log(aChecks[index]);
        }
    return(
        <div>
            <div><Link to = "/">Calendario</Link></div>
            <form>
                <div>
                    {arrayNames.map((nombre,index)=>(
                        <div key={index}>
                            {
                            ide===arrayIdentificadores[index]?
                            <div>
                                <h1>{nombre}</h1>
                                <div>
                                <label htmlFor='check'>estado</label>
                                <input type="checkbox" id='check' name="check" checked={arrayChecks[index]} onChange={e => cambiarCheck(e, index)}/>
                                </div>
                            </div>
                            :null
                            }
                        </div>
                    ))}
                </div>
                <input type='submit' value="Guardar"/>
            </form>
        </div>
    )
}
export default VerHabitos;