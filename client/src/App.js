//import logo from './logo.svg';
//en el return: <img src={logo} className="App-logo" alt="logo" />
import './App.css';
import {Route, Routes} from "react-router-dom";
import PlanificadorActual from './componentes/PlanificadorActual';
import CrearHabitos from './componentes/CrearHabitos';
import VerHabitos from './componentes/VerHabitos';

function App() {
  return (
    <div className="container">
      <Routes>
      <Route path ="/" element = {<PlanificadorActual/>}/>
      <Route path = "/habitos/crear" element = {<CrearHabitos/>}/>
      <Route path="/mostrar/:ide" element={<VerHabitos/>}></Route>

      </Routes>
    </div>
  );
}

export default App;
