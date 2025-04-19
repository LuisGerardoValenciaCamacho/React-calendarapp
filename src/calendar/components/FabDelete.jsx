import React from 'react'
import Swal from 'sweetalert2'
import { useCalendarStore } from '../../hooks'

export const FabDelete = () => {

    const { startDeleteEvent, hasActiveEvent } = useCalendarStore();

    const handlerDelete = () => {
        Swal.fire({
            title: "¿Estas seguro de eliminar este evento?",
            text: "Una vez haciendo esta acción, no podrá ser revertida",
            showDenyButton: true,
            confirmButtonText: "Aceptar",
            denyButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                startDeleteEvent();
                return;
            }
        });
    }

    return (
        <button
            className='btn btn-danger fab-danger'
            onClick={ handlerDelete }
            style={{
                display: hasActiveEvent ? "" : "none"
            }}
        >
            <i className='fa fa-trash-alt'></i>
        </button>
    )
}
