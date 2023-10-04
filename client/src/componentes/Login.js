import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; //useNavigate redirige al usuario
import './Login.css';

const Login = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [emailLogin, setEmailLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");

    const [errors, setErrors] = useState({});

    const [errorsLogin, setErrorsLogin] = useState("");

    const navigate = useNavigate();

    const registro = e =>{
        e.preventDefault();
        axios.post('http://localhost:8000/api/register',{
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        }, {withCredentials: true})
        .then(res =>{
            console.log(res);
            if(res.data.error){
                setErrorsLogin(res.data.message);
            }
            else{
                navigate("/");
            }
        })
        .catch(err => setErrors(err.response.data.errors));
    }

    const login = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login',{
            email:emailLogin,
            password: passwordLogin
        }, {withCredentials: true})
        .then(res => {
            console.log(res);

            if (res.data.error) {
                setErrorsLogin(res.data.message);
            } else {
                navigate("/");
            }
        })
        .catch(err => console.log(err));
    }
    return(
        <div className="mainLogin">
            <div className="registro">
                <h2 className="tituloReg">Registration</h2>
                <form onSubmit={registro} className="llenar">
                    <div className="inputsReg">
                        <label className="nombreRegistro" htmlFor="firstName">Name</label>
                        <input className="escribir" type="text" name="firstName" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                        {errors.firstName?<span>{errors.firstName.message}</span>:null}
                    </div>
                    <div className="inputsReg">
                        <label className="nombreRegistro" htmlFor="lastName">Lastname</label>
                        <input className="escribir" type="text" name="lastName" id="lastName" value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
                        {errors.lastName?<span>{errors.lastName.message}</span>:null}
                    </div>
                    <div className="inputsReg">
                        <label className="nombreRegistro" htmlFor="email">Email</label>
                        <input className="escribir" type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        {errors.email?<span>{errors.email.message}</span>:null}
                    </div>
                    <div className="inputsReg">
                        <label className="nombreRegistro" htmlFor="password">Password</label>
                        <input className="escribir" type="password" name="password" id="password" value={password} onChange={(e) =>setPassword(e.target.value)}/>
                        {errors.password?<span>{errors.password.message}</span>:null}        
                    </div>
                    <div className="inputsReg">
                        <label className="nombreRegistro" htmlFor="confirmPassword">Confirm password</label>
                        <input className="escribir" type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e) =>setConfirmPassword(e.target.value)}/>
                        {errors.confirmPassword?<span>{errors.confirmPassword.message}</span>:null}
                    </div>
                    <input type="submit" value="Register" className="entrar"></input>
                </form>
            </div>
            <div className="login">
            <h2 className="tituloReg">Login</h2>
            <form onSubmit={login} className="llenar">
                <div className="inputsReg">
                    <label className="nombreRegistro" htmlFor="emailLogin">E-mail</label>
                    <input className="escribir" type="email" name="emailLogin" id="emailLogin" value={emailLogin} onChange={(e) =>setEmailLogin(e.target.value)}/>
                </div>
                <div className="inputsReg">
                    <label className="nombreRegistro" htmlFor="passwordLogin">Password</label>
                    <input className="escribir" type="password" name="passwordLogin" id="passwordLogin" value={passwordLogin} onChange={(e) =>setPasswordLogin(e.target.value)}/>
                </div>
                <div>
                    {errorsLogin !== "" ? <span>{errorsLogin}</span>:null}
                </div>
                <input type="submit" value="Login" className="entrar"></input>
            </form>
            </div>
        </div>
    )
}

export default Login;