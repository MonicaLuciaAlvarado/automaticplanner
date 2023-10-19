import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; //useNavigate redirige al usuario
import './Nuevos.css';
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
    const [mesElegir, setMesElegir] = useState("");

    const [errores, setErrores] = useState({});//errores.ATRIBUTO.message

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
    var mon;
    var guardar = 0;
    var mesEle = "";
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
            },  {withCredentials: true})
            .then(res => {
                if(res.status===400){
                    console.log(res.errors);
                }
                else{
                    navigate("/");
                }
            })
            .catch(err => {
                if (err.response.status === 401) {
                    navigate("/login")
                } else {
                    console.log(err.response.data);
                    setErrores(err.response.data);
                }
            });
        }
    }, [correr])
    const guardarVarios = (e) =>{
        e.preventDefault();
        //Acá comienza a hacer el array con los días del mes
        let dayone = new Date(ano, mes, parseInt(inicial[8]+inicial[9])).getDay();
        let firstdate = inicialDate;
        let lastdate = finalDate;
        thisMonthDays=[dayone];
        let contador=dayone;
        for(let i = firstdate; i < lastdate; i++){
            contador++;
            if(contador===7){
                contador=0;
                thisMonthDays=[...thisMonthDays, contador]
            }
            else{
                thisMonthDays=[...thisMonthDays, contador]
            }
        }
        setArrayDiasMes(thisMonthDays);
        console.log(thisMonthDays);
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
        let pruebita = 0;
        if (martes===true){
            x = 0;
            for(let i=firstdate; i<=lastdate;i++){
                pruebita++;
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
            mesEle="01"
        }
        else if(mesStringVar==="february"){
            mon=1;
            mesEle="02"
        }
        else if(mesStringVar==="march"){
            mon=2;
            mesEle="03"
        }
        else if(mesStringVar==="april"){
            mon=3;
            mesEle="04"
        }
        else if(mesStringVar==="may"){
            mon=4;
            mesEle="05"
        }
        else if(mesStringVar==="june"){
            mon=5;
            mesEle="06"
        }
        else if(mesStringVar==="july"){
            mon=6;
            mesEle="07"
        }
        else if(mesStringVar==="august"){
            mon=7;
            mesEle="08"
        }
        else if(mesStringVar==="september"){
            mon=8;
            mesEle="09"
        }
        else if(mesStringVar==="octuber"){
            mon=9;
            mesEle="10"
        }
        else if(mesStringVar==="november"){
            mon=10;
            mesEle="11"
        }
        else if(mesStringVar==="december"){
            mon=11;
            mesEle="12"
        }
        setUltDayMonth(new Date(ano, mon + 1, 0).getDate());
        setMes(mon);
        setMesElegir(mesEle);
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
        <div className='crearlos'>
            <div className='encabezadoCrear'>
                <div className='elVolver'>
                <Link to = "/" className="volverCalendario">Go to Calendar</Link>
                </div>
                <h3 className='nuevosHabitos'>New Habits</h3>
            </div>
            <form onSubmit={guardarVarios} className='formulario'>
                <div className='mes'>
                    <label>Choose a month: </label>
                    <select name= "mes" defaultValue={'DEFAULT'} onChange={setTheMonth} className='seleccionador'>
                        <option value="DEFAULT" disabled>Choose one</option>
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
                </div>
                { mes!= null? null :<p className='validation'>Debe de seleccionar el mes donde añadirá los hábitos</p>}
                <div className='elegirFechas'>
                    <label>Initial date: </label>
                    <input className='dates' type='date' min={`${ano}-${mesElegir}-01`} max={`${ano}-${mesElegir}-${ultDayMonth}`} name="inicial" value={inicial} onChange={elDateInicial}/>
                </div>
                { inicial!= null? null :<p className='validation'>Debe de seleccionar la fecha inicial del lapso donde se añadirán los hábitos</p>}
                <div>
                    <label>Final date: </label>
                    <input className='dates' type='date' min={`${ano}-${mesElegir}-01`} max={`${ano}-${mesElegir}-${ultDayMonth}`} name="final" value={final} onChange={elDateFinal}/>
                </div>
                { final!= null? null :<p className='validation'>Debe de seleccionar la fecha final del lapso donde se añadirán los hábitos</p>}
                <div className='seleDias'>
                    <label>Days</label>
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
                { lunes===false & martes===false & miercoles===false & jueves==false &viernes==false & sabado===false & domingo===false? <p className='validation'>Debe de seleccionar los días de la semana a los cuales se añadirán los hábitos en el lapso elegido</p> : null}
                <button className='modificarCrear' type= "button" onClick={() => masCant()}>Add more habits</button>
                <button className='modificarCrear' type= "button" onClick={() => menCant()}>Delete latest habit</button>
                <button className='modificarCrear' type= "button" onClick={() => deleteCant()}>Delete all habits</button>
                <div className='anadirNuevos'>
                {
                    espacios.map((espacio,index)=>(
                        <div className='linea' key={index}>
                            <div className='ingresarHabitoPrioridad'>
                                <label className='inputs'>{`Task ${espacio+1}:`}</label>
                                <input className='espacio' type= 'text' name= {`task ${espacio+1}`} onChange={e => agregarName(e.target.value,espacio)}></input>
                                {errores[index] != "no"? <p className='validation'>{errores[index]}</p>:null}
                            </div>
                            <div className='ingresarHabitoPrioridad'>
                                <label className='inputs'>{`Priority ${espacio+1}:`}</label>
                                <input className='espacio' type= 'text' name= {`prioridad ${espacio+1}`} onChange={e => agregarPrioridad(e.target.value,espacio)}></input>
                            </div>
                        </div>//hacer una función que recibe espacio
                        //()=> borrarProducto(producto._id)
                    ))
                }
                </div>
                <input type='submit' value="Guardar" className='actualizar'/>
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