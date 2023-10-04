import './Planificador.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import ButtonLogout from './ButtonLogout';
import icono from './imagenes/icono.png';

const PlanificadorActual = () => {
    const [actualDate, setActualDate] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const [year, setYear] = useState(date.getFullYear(date.getMonth()));
    const [actualYear, setActualYear] = useState(date.getFullYear(date.getMonth()));
    const [month, setMonth] = useState(new Date().getMonth());
    const [currMonth, setCurrMonth] = useState(new Date().getMonth());
    const [calendarDayLastMonth, setCalendarDayLastMonth] = useState([]);
    const [calendarDay, setCalendarDay] = useState([]);
    const [calendarDayNextMonth, setCalendarDayNextMonth] = useState([]);
    const [monthName, setMonthName] = useState("");
    const [sobranPrimeraCol, setSobranPrimeraCol] = useState([]);
    const [segunda, setSegunda] = useState([]);
    const [tercera, setTercera] = useState([]);
    const [cuarta, setCuarta] = useState([]);
    const [quinta, setQuinta] = useState([]);
    const [sexta, setSexta] = useState([]);
    const [pedQuin, setPedQuin] = useState([]);
    const [pedSex, setPedSex] = useState([]);
    const [habitos, setHabitos] = useState([]);
    const [arrayHabitos, setArrayHabitos] = useState([]);
    const [idCalendario, setIdCalendario] = useState([]);

    const navigate = useNavigate();

        
    useEffect(() => {
        axios.get("http://localhost:8000/api/habitos", {withCredentials: true})
        .then( res => {
            setHabitos(res.data)
        })
        .catch(err => {
            if(err.response.status === 401){
                navigate("/login");
            }
        });
    }, []);

    useEffect(() =>{
        setActualDate(new Date());
        setMonthName(new Date(`${currMonth+1}-1-2021`).toLocaleString("en-US", { month: "long" }));
        let dayone = new Date(year, currMonth, 1).getDay(); //monday actual month (first day of the month in number ej. 1-monday, 2-tuesday...)
        let lastdate = new Date(year, currMonth + 1, 0).getDate(); //30 actual month (last date of the month in number ej. 22 o 31...)
        let dayend = new Date(year, currMonth, lastdate).getDay(); //friday actual month (last day of the month in number)
        var monthlastdate = new Date(year, currMonth, 0).getDate(); //30 previous month (last date of the previous month in number)
        // Loop to add the last dates of the previous month
        var lastMonth= [];
        var thisMonth = [];
        var nextMonth = [];
        var thisMonthHabits =[];
        var nextdays = 1;
        var arrayCal = [];
        var idCal = "";
        var mesActual = new Date().getMonth();
        if(dayone===0){
            lastMonth=[];
            setCalendarDayLastMonth(lastMonth);
        }
        else{
            for (let i = dayone; i > 0; i--) {
                lastMonth = [...lastMonth,monthlastdate-i+1]
                setCalendarDayLastMonth(lastMonth);
            }
        }
        // Loop to add the dates of the current month
        for (let i = 1; i <= lastdate; i++) {
            thisMonth = [...thisMonth, i];
            setCalendarDay(thisMonth);
        }
        //Loop to create an array showing if the days of the current month have habits or not
        thisMonthHabits=new Array(thisMonth.length);
        setArrayHabitos(thisMonthHabits);
        arrayCal=new Array(thisMonth.length);
        setIdCalendario(arrayCal);
        for (let i = 0; i < lastdate; i++) {
            thisMonthHabits[i] = false;
            setArrayHabitos(thisMonthHabits);
            console.log(arrayHabitos);
        }
        for (let i = 0; i < lastdate; i++) {
            arrayCal[i] = "";
            setIdCalendario(arrayCal);
        }
        for (let i = 0; i < lastdate; i++) {
            if(thisMonth[i]<10){
                mesActual=currMonth;
                idCal="0"+thisMonth[i]+mesActual;
                arrayCal[i]=idCal;
                setIdCalendario(arrayCal);
            }
            else{
                mesActual=currMonth;
                idCal=thisMonth[i].toString()+mesActual.toString();
                arrayCal[i]=idCal;
                setIdCalendario(arrayCal);
            }
        }

        if(year===date.getFullYear(date.getMonth())){
            for (let i = 0; i < lastdate; i++) {
                for (let j=0; j<habitos.length;j++) {
                    if(thisMonth[i]<10){
                        mesActual=currMonth;
                        idCal="0"+thisMonth[i]+mesActual;
                        if(idCal===habitos[j].identificador){
                            thisMonthHabits[i] = true;
                        }
                    }
                    else{
                        mesActual=currMonth;
                        idCal=thisMonth[i].toString()+mesActual.toString();
                        if(idCal===habitos[j].identificador){
                            thisMonthHabits[i] = true;
                        }
                    }
                }
            }
            setArrayHabitos(thisMonthHabits);
        }
        // Loop to add the first dates of the next month
        if((42-lastMonth.length-thisMonth.length)>=8){
            nextMonth = [];
            nextdays = 1;
            for(let i = dayend; i <=6; i++){
                nextMonth = [...nextMonth, nextdays];
                nextdays= nextdays+1;
                setCalendarDayNextMonth(nextMonth);
            }
            for(let i = 0; i<6; i++){
                nextMonth = [...nextMonth, nextdays];
                nextdays= nextdays+1;
                setCalendarDayNextMonth(nextMonth);
            }
        }
        else if((42-lastMonth.length-thisMonth.length)===7){
            nextMonth = [];
            nextdays = 1;
            for(let i = 0; i<=6; i++){
                nextMonth = [...nextMonth, nextdays];
                nextdays= nextdays+1;
                setCalendarDayNextMonth(nextMonth);
            }
        }
        else{
            nextMonth = [];
            nextdays = 1;
            for(let i = dayend; i<6; i++){
                nextMonth = [...nextMonth, nextdays];
                nextdays= nextdays+1;
                setCalendarDayNextMonth(nextMonth);
            }
        }
        var sobranPrimera = [];
        var segundaVar = [];
        var terceraVar = [];
        var cuartaVar = [];
        var quintaVar = [];
        var pedQuinVar = [];
        var sextaVar = [];
        var pedSexVar = [];
        if(lastMonth.length<7){
            sobranPrimera = [];
            for(let i=0;i<(7-lastMonth.length);i++){
                sobranPrimera = [...sobranPrimera, thisMonth[i]]
                setSobranPrimeraCol(sobranPrimera);
            }
            segundaVar = [];
            for(let i=sobranPrimera.length;i<=sobranPrimera.length+6;i++){
                segundaVar = [...segundaVar, thisMonth[i]];
                setSegunda(segundaVar);
            }
            terceraVar = [];
            for(let i=sobranPrimera.length+7;i<=sobranPrimera.length+13;i++){
                terceraVar = [...terceraVar,thisMonth[i]]
                setTercera(terceraVar);
            }
            cuartaVar = [];
            for(let i=sobranPrimera.length+14;i<=sobranPrimera.length+20;i++){
                cuartaVar = [...cuartaVar, thisMonth[i]]
                setCuarta(cuartaVar);
            }
            if((42-thisMonth.length-lastMonth.length)>=8){
                quintaVar = [];
                pedSexVar = [];
                setPedSex(pedSexVar);
                for(let i=sobranPrimera.length+21;i<=(thisMonth.length-1);i++){
                    quintaVar = [...quintaVar, thisMonth[i]];
                    setQuinta(quintaVar);
                }
                for(let i=0;i<7-quintaVar.length;i++){
                    pedQuinVar = [...pedQuinVar, nextMonth[i]];
                    setPedQuin(pedQuinVar);
                }
                sextaVar = [];
                for(let i=pedQuinVar.length;i<nextMonth.length;i++){
                    sextaVar = [...sextaVar, nextMonth[i]]
                    setSexta(sextaVar);
                }
            }
            else if((42-thisMonth.length-lastMonth.length)===7){
                quintaVar=[];
                pedQuinVar=[];
                setPedQuin(pedQuinVar);
                pedSexVar=[];
                setPedSex(pedSexVar);
                for(let i=sobranPrimera.length+21;i<=(sobranPrimera.length+27);i++){
                    quintaVar = [...quintaVar,thisMonth[i]];
                    setQuinta(quintaVar);
                }
                sextaVar = nextMonth;
                setSexta(sextaVar);
            }
            else{
                quintaVar = [];
                pedQuinVar=[];
                setPedQuin(pedQuinVar);
                for(let i=sobranPrimera.length+21;i<=(sobranPrimera.length+27);i++){
                    quintaVar = [...quintaVar, thisMonth[i]];
                    setQuinta(quintaVar);
                }
                pedSexVar = [];
                for(let i=sobranPrimera.length+28;i<=(thisMonth.length-1);i++){
                    pedSexVar = [...pedSexVar,thisMonth[i]];
                    setPedSex(pedSexVar);
                }
            }
        }
        else{
            segundaVar = [];
            for(let i=0;i<=6;i++){
                segundaVar = [...segundaVar, thisMonth[i]];
                setSegunda(segundaVar);
            }
            terceraVar= [];
            for(let i=7;i<=13;i++){
                terceraVar = [...terceraVar,thisMonth[i]];
                setTercera(terceraVar);
            }
            cuartaVar= [];
            for(let i=14;i<=20;i++){
                cuartaVar = [...cuartaVar, thisMonth[i]];
                setCuarta(cuartaVar);
            }
            if((42-thisMonth.length-lastMonth.length)>=8){
                quintaVar = [];
                pedQuinVar = [];
                setPedQuin(pedQuinVar);
                for(let i=21;i<=calendarDay.length-1;i++){
                    quintaVar = [...quintaVar, thisMonth[i]];
                    setQuinta(quintaVar);
                }
                pedQuinVar = [];
                for(let i=0;i<(7-quinta.length);i++){
                    pedQuinVar = [...pedQuinVar, nextMonth[i]];
                    setPedQuin(pedQuinVar);
                }
                sextaVar = [];
                for(let i=pedQuin.length;i<nextMonth.length;i++){
                    sextaVar = [...sextaVar, nextMonth[i]];
                    setSexta(sextaVar);
                }
            }
            else if ((42-thisMonth.length-lastMonth.length)===7){
                quintaVar = [];
                pedQuinVar = [];
                setPedQuin(pedQuinVar);
                for(let i=21;i<=27;i++){
                    quintaVar = [...quintaVar, thisMonth[i]]
                    setQuinta(quintaVar);
                }
                sextaVar = nextMonth;
                setSexta(sextaVar);
            }
            else {
                quintaVar = [];
                pedQuinVar = [];
                setPedQuin(pedQuinVar);
                for(let i=21;i<=27;i++){
                    quintaVar = [...quintaVar, thisMonth[i]];
                    setQuinta(quintaVar);
                }
                pedSexVar = [];
                for(let i=28;i<=(calendarDay.length-1);i++){
                    pedSexVar = [...pedSexVar, thisMonth[i]];
                    setPedSex(pedSexVar);
                }
            }
        }
    }, [currMonth, habitos])

    const next = () =>{
        if(currMonth===11){
            setCurrMonth(0);
            setYear(year+1);
        }
        else{
            setCurrMonth(currMonth+1);
        }
    }

    const previous = () =>{
        if(currMonth===0){
            setCurrMonth(11);
            setYear(year-1);
        }
        else{
            setCurrMonth(currMonth-1);
        }
    }
    return(
        <div className='main'>
            <header>
                <nav>
                <div className="marca">
                    <img src={icono} alt="logo" className="icono"/>
                    <p className="nombre">My Personal Planner</p>
                </div>
                <div className='logout'>
                <ButtonLogout></ButtonLogout>
                </div>
                </nav>
                <Link to={`/habitos/crear`} className='habitos'>Create habits</Link>
            </header>
            <div className="calendar-container">
                <header className="calendar-header">
                    <p className="calendar-current-date">{monthName} {year}</p>
                    <div className="calendar-navigation">
                        <button id="calendar-prev" className="material-symbols-rounded" onClick={()=>previous()}>←</button>
                        <button id="calendar-next" className="material-symbols-rounded" onClick={()=>next()}>→</button>
                    </div>
                </header>
                <div className="calendar-body">
                    <table>
                        <thead className="calendar-weekdays">
                            <tr className='dias'>
                                <th>Sun</th>
                                <th>Mon</th>
                                <th>Tue</th>
                                <th>Wed</th>
                                <th>Thu</th>
                                <th>Fri</th>
                                <th>Sat</th>
                            </tr>
                        </thead>
                        <tbody className="calendar-dates">
                            {
                                calendarDayLastMonth.length<7?
                                <tr>{calendarDayLastMonth.map((day, index) => (<td key={index}>{day}</td>))}
                                {sobranPrimeraCol.map((day, index) => (<td key={index}>{day}
                                {arrayHabitos[day-1]? <Link className='red' to={`/mostrar/${idCalendario[day-1]}`}><br></br>See habits</Link>:null}
                                </td>))}
                                </tr>:
                                <tr>{calendarDayLastMonth.map((day, index) => (<td key={index}>{day}</td>))}</tr>
                            }
                            <tr>{segunda.map((day, index) => (<td key={index}>{day}
                            {arrayHabitos[day-1]? <Link className='red' to={`/mostrar/${idCalendario[day-1]}`}><br></br>See habits</Link>:null}
                            </td>))}</tr>
                            <tr>{tercera.map((day, index) => (<td key={index}>{day}
                            {arrayHabitos[day-1]? <Link className='red' to={`/mostrar/${idCalendario[day-1]}`}><br></br>See habits</Link>:null}
                            </td>))}</tr>
                            <tr>{cuarta.map((day, index) => (<td key={index}>{day}
                            {arrayHabitos[day-1]? <Link className='red' to={`/mostrar/${idCalendario[day-1]}`}><br></br>See habits</Link>:null}
                            </td>))}</tr>
                            {
                                pedQuin.length>0?
                                <tr>{quinta.map((day, index) => (<td key={index}>{day}
                                {arrayHabitos[day-1]? <Link className='red' to={`/mostrar/${idCalendario[day-1]}`}><br></br>See habits</Link>:null}                                
                                </td>))}
                                {pedQuin.map((day, index) => (<td key={index}>{day}</td>))}
                                </tr>:
                                <tr>{quinta.map((day, index) => (<td key={index}>{day}
                                {arrayHabitos[day-1]? <Link className='red' to={`/mostrar/${idCalendario[day-1]}`}><br></br>See habits</Link>:null}                                
                                </td>))}</tr>
                            }
                            {
                                pedSex.length>0?
                                <tr>{pedSex.map((day,index) => (<td key={index}>{day}
                                {arrayHabitos[day-1]? <Link className='red' to={`/mostrar/${idCalendario[day-1]}`}><br></br>See habits</Link>:null}                                
                                </td>))}
                                {calendarDayNextMonth.map((day,index) => (<td key={index}>{day}</td>))}</tr>:
                                <tr>{sexta.map((day,index)=> (<td key={index}>{day}                            
                                </td>))}</tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PlanificadorActual;
