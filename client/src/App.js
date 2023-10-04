//import logo from './logo.svg';
import './App.css';
//en el return: <img src={logo} className="App-logo" alt="logo" />
import {Route, Routes} from "react-router-dom";
import PlanificadorActual from './componentes/PlanificadorActual';
import CrearHabitos from './componentes/CrearHabitos';
import VerHabitos from './componentes/VerHabitos';
import Login from './componentes/Login';

function App() {
  return (
    <div className="container">
      <Routes>
      <Route path ="/" element = {<PlanificadorActual/>}/>
      <Route path = "/habitos/crear" element = {<CrearHabitos/>}/>
      <Route path="/mostrar/:ide" element={<VerHabitos/>}></Route>
      <Route path="/login" element = {<Login/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
