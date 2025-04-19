import { useMemo, useState } from 'react'
import { addHours, differenceInSeconds } from 'date-fns';
import { es } from 'date-fns/locale/es';
import Modal from 'react-modal'
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';

registerLocale('es', es)

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const [isOpen, setIsOpen] = useState(true);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formValues, setFormValues] = useState({
        title: "",
        notes: "",
        start: new Date(),
        end: addHours(new Date(), 2)
    })

    const titleClass = useMemo(() => {
        if(!formSubmitted) return "";
        return (formValues.title.length > 0) ? "" : "is-invalid"
    }, [formValues.title, formSubmitted])

    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChange = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        const difference = differenceInSeconds(formValues.end, formValues.start);
        if(isNaN(difference)) {
            Swal.fire({title: "Error", text: "Las fechas son incorrectas", icon: "error"})
            return;
        }
        if(difference <= 0) {
            Swal.fire({title: "Error", text: "La fecha de inicio no puede ser menor que la fecha final", icon: "error"});
            return;
        }
        if(formValues.title.length <= 0) {
            Swal.fire({title: "Error", text: "El titulo es obligatorio", icon: "error"});
            return;
        }
        setFormSubmitted(false);
    }

    const onCloseModal = () => {
        setIsOpen(false);
    }

    return (
        <Modal
            isOpen={ isOpen }
            onRequestClose={onCloseModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>
                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        className="form-control"
                        style={{display: "block"}}
                        selected={ formValues.start }
                        onChange={ (e) => onDateChange(e, "start") }
                        dateFormat="Pp"
                        locale="es"
                        showTimeSelect 
                        minDate={new Date()}
                        timeCaption='Hora'
                    />
                </div>
                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker 
                        className="form-control"
                        selected={ formValues.end } 
                        onChange={ (e) => onDateChange(e, "end") }
                        dateFormat="Pp"
                        locale="es"
                        showTimeSelect 
                        minDate={ formValues.start || new Date() }
                        timeCaption='Hora'
                    />
                </div>
                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>
                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>
                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
