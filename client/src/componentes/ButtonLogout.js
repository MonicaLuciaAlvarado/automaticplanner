import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ButtonLogout = () =>{
    const navigate = useNavigate();

    const cerrarSesion = () =>{
        axios.get('http://localhost:8000/api/logout', {withCredentials: true})
        .then(res => navigate("/login"))
        .catch(err => console.log(err));
    }
    return(
        <button onClick={cerrarSesion}>Log out</button>
    )
}
export default ButtonLogout;