import React, { useState } from 'react'
import "./LoginPage.css"
import { useForm, useAuthStore, useCalendarStore } from '../../hooks'
import Swal from 'sweetalert2'
import { Navigate } from 'react-router'

const loginFormField = {
    loginUsername: "",
    loginPassword: ""
}

const registerFormField = {
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    passwordReply: ""
}

export const LoginPage = () => {

    const { loginUsername, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormField);
    const { name, username, email, phone, password, passwordReply, onInputChange: onRegisterInputChange } = useForm(registerFormField);

    const { startLogin } = useAuthStore();

    const submitLogin = (event) => {
        event.preventDefault();
        if(loginUsername.length <= 0) {
            Swal.fire({title: "Falta información", text: "Username es obligatorio", icon: "info"});
            return;
        }
        if(loginPassword.length <= 0) {
            Swal.fire({title: "Falta información", text: "Contraseña es obligatoria", icon: "info"});
            return;
        }
        startLogin({ username: loginUsername, password: loginPassword});
        <Navigate to={"/calendarApp"}/>
    }

    const submitRegister = (event) => {
        event.preventDefault();
        if(name.length <= 0) {
            Swal.fire({title: "Falta información", text: "Nombre es obligatorio", icon: "info"});
            return;
        }
        if(username.length <= 0) {
            Swal.fire({title: "Falta información", text: "Nombre de usuario es obligatoria", icon: "info"});
            return;
        }
        if(email.length <= 0) {
            Swal.fire({title: "Falta información", text: "Correo es obligatorio", icon: "info"});
            return;
        }
        if(phone.length <= 0) {
            Swal.fire({title: "Falta información", text: "Teléfono es obligatoria", icon: "info"});
            return;
        }
        if(password.length <= 0) {
            Swal.fire({title: "Falta información", text: "Contraseña es obligatorio", icon: "info"});
            return;
        }
        if(passwordReply.length <= 0) {
            Swal.fire({title: "Falta información", text: "Repetir contraseña es obligatorio", icon: "info"});
            return;
        }
        if(password !== passwordReply) {
            Swal.fire({title: "Error", text: "Las contraseñas no coinciden", icon: "error"});
            return;
        }
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={submitLogin}>
                        <div className="form-group mb-2">
                            <input type="text" className="form-control" name="loginUsername" placeholder="Username" value={loginUsername} onChange={onLoginInputChange}/>
                        </div>
                        <div className="form-group mb-2">
                            <input type="password" className="form-control" name="loginPassword" placeholder="Contraseña" value={loginPassword} onChange={onLoginInputChange}/>
                        </div>
                        <div className="d-grid gap-2">
                            <input type="submit"className="btnSubmit"value="Login" />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={submitRegister}>
                        <div className="form-group mb-2">
                            <input type="text" className="form-control" placeholder="Nombre" name="name" value={name} onChange={onRegisterInputChange}/>
                        </div>
                        <div className="form-group mb-2">
                            <input type="text" className="form-control" placeholder="Nombre de usuario" name="username" value={username} onChange={onRegisterInputChange}/>
                        </div>
                        <div className="form-group mb-2">
                            <input type="email" className="form-control" placeholder="Correo" name="email" value={email} onChange={onRegisterInputChange}/>
                        </div>
                        <div className="form-group mb-2">
                            <input type="phone" className="form-control" placeholder="Celular" name="phone" value={phone} onChange={onRegisterInputChange}/>
                        </div>
                        <div className="form-group mb-2">
                            <input type="password" className="form-control" placeholder="Contraseña" name="password" value={password} onChange={onRegisterInputChange}/>
                        </div>
                        <div className="form-group mb-2">
                            <input type="password" className="form-control" placeholder="Repita la contraseña" name="passwordReply" value={passwordReply} onChange={onRegisterInputChange}/>
                        </div>
                        <div className="d-grid gap-2">
                            <input type="submit" className="btnSubmit" value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
