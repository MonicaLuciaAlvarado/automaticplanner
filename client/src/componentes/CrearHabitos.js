import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; //useNavigate redirige al usuario
import './Nuevos.css';
const CrearHabitos = () => {
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

    const [errores, setErrores] = useState({nombres:["no"],mes:"no",dias:"no"});//errores.ATRIBUTO.message

    var mesStringVar = "";
    var ini = "";
    var fin = "";
    var contadorcito = 1;
    var arrayEspacios = [0];
    var arrayNombres = [""];
    var arrayPrioridades = [""]
    var thisMonthDays = [];
    var x = 0;
    var diasEx = [];
    var thisMonth = [];
    var mon;
    var guardar = 0;
    var mesEle = "";
    var arrayLosNames=["no"];
    useEffect(() => {
    }, [mes])
    useEffect(() => {
        if (correr > 0) {
            setCorrer(0);
            console.log(nombres);
            console.log(prioridades);
            if(mes===null){
                console.log("mes null");
            }
            else if(mes===undefined){
                console.log("mes undefined");
            }
            else{
                console.log("mes array vacío" + mes)
            }
            console.log(mes);
            if(diasExportar===null){
                console.log("días null");
            }
            else if(diasExportar===undefined){
                console.log("díasExportar undefined");
            }
            else{
                console.log("días exportar array vacío" + diasExportar);
                console.log(diasExportar.length);
            }
            console.log(diasExportar);
            console.log(ano);
            console.log(check);
            axios.post("http://localhost:8000/api/habitos", {
                nombres,
                prioridades,
                mes,
                diasExportar,
                ano,
                check
            }, { withCredentials: true })
                .then(res => {
                    if (res.status === 400) {
                        console.log(res.errors);
                    }
                    else {
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
    const guardarVarios = (e) => {
        e.preventDefault();
        if (mes === null) {
            guardar++;
            setCorrer(guardar);
        }
        else if (inicial === null) {
            guardar++;
            setCorrer(guardar);
        }
        else if (final === null) {
            guardar++;
            setCorrer(guardar);
        }
        else if (lunes === false & martes === false & miercoles === false & jueves == false & viernes == false & sabado === false & domingo === false) {
            guardar++;
            setCorrer(guardar);
        }
        else {
            //Acá comienza a hacer el array con los días del mes
            let dayone = new Date(ano, mes, parseInt(inicial[8] + inicial[9])).getDay();
            let firstdate = inicialDate;
            let lastdate = finalDate;
            thisMonthDays = [dayone];
            let contador = dayone;
            for (let i = firstdate; i < lastdate; i++) {
                contador++;
                if (contador === 7) {
                    contador = 0;
                    thisMonthDays = [...thisMonthDays, contador]
                }
                else {
                    thisMonthDays = [...thisMonthDays, contador]
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
            if (lunes === true) {
                x = 0;
                for (let i = firstdate; i <= lastdate; i++) {
                    if (thisMonthDays[x] === 1) {
                        diasEx = [...diasEx, thisMonth[x]];
                        setDiasExportar(diasEx);//13 y 20
                    }
                    x++;
                }
                x = 0;
            }
            let pruebita = 0;
            if (martes === true) {
                x = 0;
                for (let i = firstdate; i <= lastdate; i++) {
                    pruebita++;
                    if (thisMonthDays[x] === 2) {
                        diasEx = [...diasEx, thisMonth[x]];
                        setDiasExportar(diasEx);//13 y 20
                    }
                    x++;
                }
                x = 0;
            }
            if (miercoles === true) {
                x = 0;
                for (let i = firstdate; i <= lastdate; i++) {
                    if (thisMonthDays[x] === 3) {
                        diasEx = [...diasEx, thisMonth[x]];
                        setDiasExportar(diasEx);//13 y 20
                    }
                    x++;
                }
                x = 0;
            }
            if (jueves === true) {
                x = 0;
                for (let i = firstdate; i <= lastdate; i++) {
                    if (thisMonthDays[x] === 4) {
                        diasEx = [...diasEx, thisMonth[x]];
                        setDiasExportar(diasEx);//13 y 20
                    }
                    x++;
                }
                x = 0;
            }
            if (viernes === true) {
                x = 0;
                for (let i = firstdate; i <= lastdate; i++) {
                    if (thisMonthDays[x] === 5) {
                        diasEx = [...diasEx, thisMonth[x]];
                        setDiasExportar(diasEx);//13 y 20
                    }
                    x++;
                }
                x = 0;
            }
            if (sabado === true) {
                x = 0;
                for (let i = firstdate; i <= lastdate; i++) {
                    if (thisMonthDays[x] === 6) {
                        diasEx = [...diasEx, thisMonth[x]];
                        setDiasExportar(diasEx);//13 y 20
                    }
                    x++;
                }
                x = 0;
            }
            if (domingo === true) {
                x = 0;
                for (let i = firstdate; i <= lastdate; i++) {
                    if (thisMonthDays[x] === 0) {
                        diasEx = [...diasEx, thisMonth[x]];
                        setDiasExportar(diasEx);//13 y 20
                    }
                    x++;
                }
                x = 0;
            }
            let mon = mes;
            setMes(mon);
            guardar++;
            setCorrer(guardar);
            //acá termino de hacer el array;
        }
    }
    const setTheMonth = (e) => {
        mesStringVar = e.target.value;
        if (mesStringVar === "january") {
            mon = 0;
            mesEle = "01"
        }
        else if (mesStringVar === "february") {
            mon = 1;
            mesEle = "02"
        }
        else if (mesStringVar === "march") {
            mon = 2;
            mesEle = "03"
        }
        else if (mesStringVar === "april") {
            mon = 3;
            mesEle = "04"
        }
        else if (mesStringVar === "may") {
            mon = 4;
            mesEle = "05"
        }
        else if (mesStringVar === "june") {
            mon = 5;
            mesEle = "06"
        }
        else if (mesStringVar === "july") {
            mon = 6;
            mesEle = "07"
        }
        else if (mesStringVar === "august") {
            mon = 7;
            mesEle = "08"
        }
        else if (mesStringVar === "september") {
            mon = 8;
            mesEle = "09"
        }
        else if (mesStringVar === "octuber") {
            mon = 9;
            mesEle = "10"
        }
        else if (mesStringVar === "november") {
            mon = 10;
            mesEle = "11"
        }
        else if (mesStringVar === "december") {
            mon = 11;
            mesEle = "12"
        }
        setUltDayMonth(new Date(ano, mon + 1, 0).getDate());
        setMes(mon);
        setMesElegir(mesEle);
    }

    const elDateInicial = (e) => {
        ini = e.target.value;
        setInicial(ini);
        ini = parseInt(ini[8] + ini[9]);
        setInicialDate(ini);
    }
    const elDateFinal = (e) => {
        fin = e.target.value;
        setFinal(fin);
        fin = parseInt(fin[8] + fin[9]);
        setFinalDate(fin);
    }

    const masCant = () => {
        contadorcito = contador;
        arrayLosNames = [...errores.nombres,"no"];
        arrayEspacios = [...espacios, contadorcito];
        setEspacios(arrayEspacios);
        setErrores({nombres:arrayLosNames,mes:"no",dias:"no"});
        arrayNombres = [...nombres, ""];
        setNombres(arrayNombres);
        arrayPrioridades = [...prioridades, ""];
        setPrioridades(arrayPrioridades);
        contadorcito = contadorcito + 1;
        setContador(contadorcito);
    }
    const menCant = () => {
        contadorcito = contador;
        arrayEspacios = [espacios[0]];
        arrayLosNames = [errores.nombres[0]];
        for (let i = 1; i < (errores.nombres.length - 1); i++) {
            arrayLosNames = [...arrayLosNames, errores.nombres[i]];
        }
        for (let i = 1; i < (espacios.length - 1); i++) {
            arrayEspacios = [...arrayEspacios, espacios[i]];
        }
        setErrores({nombres:arrayLosNames,mes:"no",dias:"no"});
        setEspacios(arrayEspacios);
        arrayNombres = [nombres[0]];
        for (let i = 1; i < (nombres.length - 1); i++) {
            arrayNombres = [...arrayNombres, nombres[i]];
        }
        setNombres(arrayNombres);
        arrayPrioridades = [prioridades[0]];
        for (let i = 1; i < (prioridades.length - 1); i++) {
            arrayPrioridades = [...arrayPrioridades, prioridades[i]];
        }
        setPrioridades(arrayPrioridades);
        contadorcito = contadorcito - 1;
        setContador(contadorcito);
    }
    const deleteCant = () => {
        contadorcito = 1;
        arrayEspacios = [0];
        arrayNombres = [""];
        arrayPrioridades = [""];
        arrayLosNames = ["no"];
        setErrores({nombres:arrayLosNames,mes:"no",dias:"no"});
        setEspacios(arrayEspacios);
        setNombres(arrayNombres);
        setPrioridades(arrayPrioridades);
        setContador(contadorcito);
    }
    const agregarName = (importedValue, espacio) => {
        let tempName = importedValue;
        arrayNombres = nombres;
        for (let i = 0; i < arrayNombres.length; i++) {
            if (i === espacio) {
                arrayNombres[espacio] = tempName;
            }
        }
        setNombres(arrayNombres);
    }
    const agregarPrioridad = (importedValue, espacio) => {
        let tempPrio = importedValue;
        arrayPrioridades = prioridades;
        for (let i = 0; i < arrayPrioridades.length; i++) {
            if (i === espacio) {
                arrayPrioridades[espacio] = tempPrio;
            }
        }
        setPrioridades(arrayPrioridades);
    }
    return (
        <div className='crearlos'>
            <div className='encabezadoCrear'>
                <div className='elVolver'>
                    <Link to="/" className="volverCalendario">Go to Calendar</Link>
                </div>
                <h3 className='nuevosHabitos'>New Habits</h3>
            </div>
            <form onSubmit={guardarVarios} className='formulario'>
            <p className='direction'>1. You must select the month where you will add the habits</p>
                <div className='mes'>
                    <label>Choose a month: </label>
                    <select name="mes" defaultValue={'DEFAULT'} onChange={setTheMonth} className='seleccionador'>
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
                {errores.mes != "no" ? <p className='validation'>{errores.mes}</p> : null}
                <p className='direction'>2. You must select the initial date of the period where the habits will be added</p>
                <div className='elegirFechas'>
                    <label>Initial date: </label>
                    <input className='dates' type='date' min={`${ano}-${mesElegir}-01`} max={`${ano}-${mesElegir}-${ultDayMonth}`} name="inicial" value={inicial} onChange={elDateInicial} />
                </div>
                {errores.dias != "no" ? <p className='validation'>{errores.dias}</p> : null}
                <p className='direction'>3. You must select the end date of the period where the habits will be added</p>
                <div>
                    <label>Final date: </label>
                    <input className='dates' type='date' min={`${ano}-${mesElegir}-01`} max={`${ano}-${mesElegir}-${ultDayMonth}`} name="final" value={final} onChange={elDateFinal} />
                </div>
                {errores.dias != "no" ? <p className='validation'>{errores.dias}</p> : null}
                <p className='direction'>4. You must select the days of the week to which the habits will be added in the chosen period</p>
                <div className='seleDias'>
                    <label>Days</label>
                    <div>
                        <input type="checkbox" id='domingo' name="domingo" checked={domingo} onChange={e => setDomingo(e.target.checked)} />
                        <label htmlFor='domingo'>0. Sunday</label>
                    </div>
                    <div>
                        <input type="checkbox" id='lunes' name="lunes" checked={lunes} onChange={e => setLunes(e.target.checked)} />
                        <label htmlFor='lunes'>1. Monday</label>
                    </div>
                    <div>
                        <input type="checkbox" id='martes' name="martes" checked={martes} onChange={e => setMartes(e.target.checked)} />
                        <label htmlFor='martes'>2. Tuesday</label>
                    </div>
                    <div>
                        <input type="checkbox" id='miercoles' name="miercoles" checked={miercoles} onChange={e => setMiercoles(e.target.checked)} />
                        <label htmlFor='miercoles'>3. Wednesday</label>
                    </div>
                    <div>
                        <input type="checkbox" id='jueves' name="jueves" checked={jueves} onChange={e => setJueves(e.target.checked)} />
                        <label htmlFor='jueves'>4. Thursday</label>
                    </div>
                    <div>
                        <input type="checkbox" id='viernes' name="viernes" checked={viernes} onChange={e => setViernes(e.target.checked)} />
                        <label htmlFor='viernes'>5. Friday</label>
                    </div>
                    <div>
                        <input type="checkbox" id='sabado' name="sabado" checked={sabado} onChange={e => setSabado(e.target.checked)} />
                        <label htmlFor='sabado'>6. Saturday</label>
                    </div>
                </div>
                {errores.dias != "no" ? <p className='validation'>{errores.dias}</p> : null}
                <button className='modificarCrear' type="button" onClick={() => masCant()}>Add more habits</button>
                <button className='modificarCrear' type="button" onClick={() => menCant()}>Delete latest habit</button>
                <button className='modificarCrear' type="button" onClick={() => deleteCant()}>Delete all habits</button>
                <div className='anadirNuevos'>
                    {
                        espacios.map((espacio, index) => (
                            <div className='linea' key={index}>
                                <div className='ingresarHabitoPrioridad'>
                                    <label className='inputs'>{`Task ${espacio + 1}:`}</label>
                                    <input className='espacio' type='text' name={`task ${espacio + 1}`} onChange={e => agregarName(e.target.value, espacio)}></input>
                                    {errores.nombres[index] != "no" ? <p className='validation'>{errores.nombres[index]}</p> : null}
                                </div>
                                <div className='ingresarHabitoPrioridad'>
                                    <label className='inputs'>{`Priority ${espacio + 1}:`}</label>
                                    <input className='espacio' type='text' name={`prioridad ${espacio + 1}`} onChange={e => agregarPrioridad(e.target.value, espacio)}></input>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <input type='submit' value="Submit" className='actualizar' />
            </form>
        </div>
    )
}

export default CrearHabitos;