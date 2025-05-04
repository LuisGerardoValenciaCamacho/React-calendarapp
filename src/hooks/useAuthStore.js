import { useDispatch, useSelector } from "react-redux"
import { checking, onLogin, onLogout } from "../store";
import calendarApi from "../api/calendarApi";
import Swal from "sweetalert2";

const codes = {
    "ERR_NETWORK": "No se ha podido completar su solicitud",
    "ERR_BAD_REQUEST": "No tiene acceso a este modulo"
};

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async({ username, password }) => {
        dispatch(checking());
        calendarApi.post("/login", { username, password }).then(response => {
            Swal.fire({title: "Bienvenido!", text: response.data.message, icon: "success"})
            sessionStorage.setItem("token", response.data.token);
            dispatch(onLogin(response.data.username));
        }).catch(error => {
            Swal.fire({title: "Error", text: codes[error.code], icon: "error"})
        })
    }

    const startLogout = () => {
        sessionStorage.clear();
        dispatch(onLogout());
    }

    return {
        status,
        user,
        errorMessage,
        startLogin,
        startLogout
    }
}