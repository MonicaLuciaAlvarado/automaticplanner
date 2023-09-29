import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; //useNavigate redirige al usuario

const CrearHabitos = () =>{
    const [nombres, setNombres] = useState([""]);
    const [prioridades, setPrioridades] = useState([""]);
    const [mes, setMes] = useState();
    const [lunes, setLunes] = useState(false);
    const [martes, setMartes] = useState(false);
    const [miercoles, setMiercoles] = useState(false);
    const [jueves, setJueves] = useState(false);
    const [viernes, setViernes] = useState(false);
    const [sabado, setSabado] = useState(false);
    const [domingo, setDomingo] = useState(false);
    const [inicial, setInicial] = useState();
    const [final, setFinal] = useState();
    const [inicialDate, setInicialDate] = useState();
    const [finalDate, setFinalDate] = useState();
    const [ano, setAno] = useState(new Date().getFullYear());
    const [check, setCheck] = useState(false);
    const [contador, setContador] = useState(1);
    const [espacios, setEspacios] = useState([0]);
    const [arrayDiasMes, setArrayDiasMes] = useState([]);
    const [arrayDatesMes, setArrayDatesMes] = useState([]);
    const [diasExportar, setDiasExportar] = useState([]);
    const [ultDayMonth, setUltDayMonth] = useState(new Date(ano, mes + 1, 0).getDate());
    const [correr, setCorrer] = useState(0);
    const navigate = useNavigate();

    var mesStringVar = "";
    var ini = "";
    var fin = "";
    var contadorcito = 1;
    var arrayEspacios = [0];
    var arrayNombres = [""];
    var arrayPrioridades = [""]
    var thisMonthDays = [];
    var x =0;
    var diasEx = [];
    var thisMonth = [];
    var mon = new Date().getMonth();
    var guardar = 0;
    useEffect(() =>{
    }, [mes])
    useEffect(() =>{
        if(correr>0){
            setCorrer(0);
            console.log(nombres);
            console.log(prioridades);
            console.log(mes);
            console.log(diasExportar);
            console.log(ano);
            console.log(check);
            axios.post("http://localhost:8000/api/habitos",{
                nombres,
                prioridades,
                mes,
                diasExportar,
                ano,
                check
            })
            .then(res => navigate("/"))
            .catch(err => console.log(err));
        }
    }, [correr])
    const guardarVarios = (e) =>{
            e.preventDefault();
            //Acá comienza a hacer el array con los días del mes
            let dayone = new Date(ano, mes, parseInt(inicial[8]+inicial[9])).getDay();
            let firstdate = inicialDate;
            let lastdate = finalDate;
            if (dayone===6){
                thisMonthDays = [dayone];
            }
            else{
                for (let i = dayone; i<=6; i++){
                    thisMonthDays = [...thisMonthDays, i];
                    setArrayDiasMes(thisMonthDays);
                }
            }
            for (let i = (firstdate+thisMonthDays.length); i <=lastdate; i++) {//Hago un array con los días de la semana
                for (let j = 0; j<=6; j++){
                    if(i<=(lastdate+1)){
                        thisMonthDays = [...thisMonthDays, j];
                        setArrayDiasMes(thisMonthDays);
                        i++;
                    }
                }
            }
            //Acá termina de hacer el array con los días del mes
            //Hace un array con las fechas del mes
            for (let i = firstdate; i <= lastdate; i++) {//Hago un array con las fechas del mes
                thisMonth = [...thisMonth, i];
                setArrayDatesMes(thisMonth);
            }
            //Termina el array con las fechas del mes
            //Ahora hago el array con las fechas del mes que necesito
            if (lunes===true){
                x = 0;
                for(let i=firstdate; i<=lastdate;i++){
                    if(thisMonthDays[x]===1){
                        diasEx=[...diasEx, thisMonth[x]];
                        setDiasExportar(diasEx);//13 y 20
                    }
                    x++;
                }
                x=0;
            }
            if (martes===true){
                x = 0;
                for(let i=firstdate; i<=lastdate;i++){
                    if(thisMonthDays[x]===2){
                        diasEx=[...diasEx, thisMonth[x]];
                        setDiasExportar(diasEx);//13 y 20
                    }
                    x++;
                }
                x=0;
            }
            if (miercoles===true){
                x = 0;
                for(let i=firstdate; i<=lastdate;i++){
                    if(thisMonthDays[x]===3){
                        diasEx=[...diasEx, thisMonth[x]];
                        setDiasExportar(diasEx);//13 y 20
                    }
                    x++;
                }
                x=0;
            }
            if (jueves===true){
                x = 0;
                for(let i=firstdate; i<=lastdate;i++){
                    if(thisMonthDays[x]===4){
                        diasEx=[...diasEx, thisMonth[x]];
                        setDiasExportar(diasEx);//13 y 20
                    }
                    x++;
                }
                x=0;
            }
            if (viernes===true){
                x = 0;
                for(let i=firstdate; i<=lastdate;i++){
                    if(thisMonthDays[x]===5){
                        diasEx=[...diasEx, thisMonth[x]];
                        setDiasExportar(diasEx);//13 y 20
                    }
                    x++;
                }
                x=0;
            }
            if (sabado===true){
                x = 0;
                for(let i=firstdate; i<=lastdate;i++){
                    if(thisMonthDays[x]===6){
                        diasEx=[...diasEx, thisMonth[x]];
                        setDiasExportar(diasEx);//13 y 20
                    }
                    x++;
                }
                x=0;
            }
            if (domingo===true){
                x = 0;
                for(let i=firstdate; i<=lastdate;i++){
                    if(thisMonthDays[x]===0){
                        diasEx=[...diasEx, thisMonth[x]];
                        setDiasExportar(diasEx);//13 y 20
                    }
                    x++;
                }
                x=0;
            }
            let mon=mes;
            setMes(mon);

            guardar++;
            setCorrer(guardar);
            
            //acá termino de hacer el array;
    }
    const setTheMonth =(e)=>{
        mesStringVar = e.target.value;
        if(mesStringVar==="january"){
            mon=0;
        }
        else if(mesStringVar==="february"){
            mon=1;
        }
        else if(mesStringVar==="march"){
            mon=2;
        }
        else if(mesStringVar==="april"){
            mon=3;
        }
        else if(mesStringVar==="may"){
            mon=4;
        }
        else if(mesStringVar==="june"){
            mon=5;
        }
        else if(mesStringVar==="july"){
            mon=6;
        }
        else if(mesStringVar==="august"){
            mon=7;
        }
        else if(mesStringVar==="september"){
            mon=8;
        }
        else if(mesStringVar==="octuber"){
            mon=9;
        }
        else if(mesStringVar==="november"){
            mon=10;
        }
        else if(mesStringVar==="december"){
            mon=11;
        }
        setUltDayMonth(new Date(ano, mon + 1, 0).getDate());
        setMes(mon);
    }

    const elDateInicial = (e)=>{
        ini = e.target.value;
        setInicial(ini);
        ini = parseInt(ini[8]+ini[9]);
        setInicialDate(ini);
    }
    const elDateFinal = (e)=>{
        fin = e.target.value;
        setFinal(fin);
        fin = parseInt(fin[8]+fin[9]);
        setFinalDate(fin);
    }
    
    const masCant = () =>{
        contadorcito=contador;
        arrayEspacios = [...espacios, contadorcito];
        setEspacios(arrayEspacios);
        arrayNombres = [...nombres, ""];
        setNombres(arrayNombres);
        arrayPrioridades = [...prioridades, ""];
        setPrioridades(arrayPrioridades);
        contadorcito=contadorcito+1;
        setContador(contadorcito);
    }
    const menCant = () =>{
        contadorcito=contador;
        arrayEspacios = [espacios[0]];
        for(let i = 1; i<(espacios.length-1); i++){
            arrayEspacios=[...arrayEspacios,espacios[i]];
        }
        setEspacios(arrayEspacios);
        arrayNombres = [nombres[0]];
        for(let i = 1; i<(nombres.length-1); i++){
            arrayNombres=[...arrayNombres,nombres[i]];
        }
        setNombres(arrayNombres);
        arrayPrioridades = [prioridades[0]];
        for(let i = 1; i<(prioridades.length-1); i++){
            arrayPrioridades=[...arrayPrioridades,prioridades[i]];
        }
        setPrioridades(arrayPrioridades);
        contadorcito=contadorcito-1;
        setContador(contadorcito);
    }
    const deleteCant = () =>{
        contadorcito=1;
        arrayEspacios=[0];
        arrayNombres=[""];
        arrayPrioridades=[""];
        setEspacios(arrayEspacios);
        setNombres(arrayNombres);
        setPrioridades(arrayPrioridades);
        setContador(contadorcito);
    }
    const agregarName = (importedValue, espacio) =>{
        let tempName= importedValue;
        arrayNombres=nombres;
        for (let i =0; i<arrayNombres.length; i++){
            if(i===espacio){
                arrayNombres[espacio]= tempName;
            }
        }
        setNombres(arrayNombres);
    }
    const agregarPrioridad = (importedValue, espacio) =>{
        let tempPrio= importedValue;
        arrayPrioridades=prioridades;
        for (let i =0; i<arrayPrioridades.length; i++){
            if(i===espacio){
                arrayPrioridades[espacio]= tempPrio;
            }
        }
        setPrioridades(arrayPrioridades);
    }
//arrayEspacios = espacios.filter(espacio => espacio !== espacio[espacio.length-1]);
//setEspacios(arrayEspacios);
//new Date (2023, 8, 22).getDay() me devuelve 5 porque es viernes el 22 del 9
    return(
        <div>
            <h3>Nuevos Habitos</h3>
            <form onSubmit={guardarVarios}>
                    <select name= "mes" defaultValue={'DEFAULT'} onChange={setTheMonth}>
                        <option value="DEFAULT" disabled>Seleccione uno</option>
                        <option value="january">January</option>
                        <option value="february">February</option>
                        <option value="march">March</option>
                        <option value="april">April</option>
                        <option value="may">May</option>
                        <option value="june">June</option>
                        <option value="july">July</option>
                        <option value="august">August</option>
                        <option value="september">September</option>
                        <option value="octuber">Octuber</option>
                        <option value="november">November</option>
                        <option value="december">December</option>
                    </select>
                <div>
                    <label>Fecha inicial: </label>
                    <input type='date' min={`${ano}-0${mes+1}-01`} max={`${ano}-0${mes+1}-${ultDayMonth}`} name="inicial" value={inicial} onChange={elDateInicial}/>
                </div>
                <div>
                    <label>Fecha final: </label>
                    <input type='date' min={`${ano}-0${mes+1}-01`} max={`${ano}-0${mes+1}-${ultDayMonth}`} name="final" value={final} onChange={elDateFinal}/>
                </div>
                <div>
                    <label>Días</label>
                    <div>
                    <input type="checkbox" id='domingo' name="domingo" checked={domingo} onChange={e => setDomingo(e.target.checked)}/>
                    <label htmlFor='domingo'>0. Sunday</label>
                    </div>
                    <div>
                    <input type="checkbox" id='lunes' name="lunes" checked={lunes} onChange={e => setLunes(e.target.checked)}/>
                    <label htmlFor='lunes'>1. Monday</label>
                    </div>
                    <div>
                    <input type="checkbox" id='martes' name="martes" checked={martes} onChange={e => setMartes(e.target.checked)}/>
                    <label htmlFor='martes'>2. Tuesday</label>
                    </div>
                    <div>
                    <input type="checkbox" id='miercoles' name="miercoles" checked={miercoles} onChange={e => setMiercoles(e.target.checked)}/>
                    <label htmlFor='miercoles'>3. Wednesday</label>
                    </div>
                    <div>
                    <input type="checkbox" id='jueves' name="jueves" checked={jueves} onChange={e => setJueves(e.target.checked)}/>
                    <label htmlFor='jueves'>4. Thursday</label>
                    </div>
                    <div>
                    <input type="checkbox" id='viernes' name="viernes" checked={viernes} onChange={e => setViernes(e.target.checked)}/>
                    <label htmlFor='viernes'>5. Friday</label>
                    </div>
                    <div>
                    <input type="checkbox" id='sabado' name="sabado" checked={sabado} onChange={e => setSabado(e.target.checked)}/>
                    <label htmlFor='sabado'>6. Saturday</label>
                    </div>
                </div>
                <button type= "button" onClick={() => masCant()}>Add more habits</button>
                <button type= "button" onClick={() => menCant()}>Delete latest habit</button>
                <button type= "button" onClick={() => deleteCant()}>Delete all habits</button>
                {
                    espacios.map((espacio,index)=>(
                        <div key={index}>
                        <label>{`Task ${espacio+1}:`}</label>
                        <input type= 'text' name= {`task ${espacio+1}`} onChange={e => agregarName(e.target.value,espacio)}></input>
                        <label>{`Prioridad ${espacio+1}:`}</label>
                        <input type= 'text' name= {`prioridad ${espacio+1}`} onChange={e => agregarPrioridad(e.target.value,espacio)}></input>
                        </div>//hacer una función que recibe espacio
                        //()=> borrarProducto(producto._id)
                    ))
                }
                <input type='submit' value="Guardar"/>
            </form>
        </div>
    )
}
//Cuado guardo =>1. Hago el array de fechas, donde una misma fecha se le aplica a todos los nombres
// Para ello, necesito un array con el calendario con Days que se hace a como en el calendario con un for y ver ejercicio del mundo dePcman donde se relacionan dos arrays, uno con números del mes y otro con days, donde si days son true entonces saco esos días y los meto en un array, donde luego, arreglo el array en orden de menor a mayor y tendrá todos los días del mes donde aplica las tasks
//2. El resto de info ya la tengo
//3. llamo a una función dentro de un for dentro de un for que me guarda los objetos. El for de afuera son las fechas porque para una misma fecha quiero muchos objetos y el for de adentro tiene los nombres porque los nombres me varían, el resto de cosas son iguales siempre, entonces de hecho el resto de cosas las puedo establecer fuera de los for.
//4 en el Planificador en el .map colocar un {} que diga que si día y mes es igual, entonces que imprima un link que me lleva a una nueva pág de editar. esta página recibe el mes y el día, ya no sólo 1 valor (preguntar esto) y tiene un map con los objetos que tienen ese mes y día, se pueden añadir o eliminar tasks y marcarlos como hechos, hay un link para devolverme a la página principal

export default CrearHabitos;