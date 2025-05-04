import { useDispatch, useSelector } from "react-redux"
import { onAddEvent, onDeleteEvent, onGetAllEvents, onSetActiveEvent, onUpdateEvent } from "../store";
import Swal from "sweetalert2";
import calendarApi from "../api/calendarApi";

export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);

    const getAllEvents = async() => {
        calendarApi.get("/api/event/all", {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then(response => {
            const events = response.data.map(event => {
                event.start = new Date(event.start);
                event.end = new Date(event.end);
                return event;
            })
            dispatch(onGetAllEvents(events));
        }).catch(error => {
            console.log(error);
            Swal.fire({title: "Error", text: "Hubo un error al obtener eventos", icon: "error"});
        });
    }

    const setActiveEvent = ( calendarEvent ) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async( calendarEvent ) => {
        if(calendarEvent.id) {
            calendarApi.put(`/api/event/update/${calendarEvent.id}`, { ...calendarEvent }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            }).then(response => {
                const dataEvent = {
                    ...response.data,
                    start: new Date(response.data.start),
                    end: new Date(response.data.end)
                };
                dispatch(onUpdateEvent(dataEvent));
            }).catch(error => {
                Swal.fire({title: "Error", text: "Hubo un error al guardar evento", icon: "error"});
            });
            dispatch(onUpdateEvent(calendarEvent));
        } else {
            calendarApi.post("/api/event/create", { ...calendarEvent }, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            }).then(response => {
                const dataEvent = {
                    ...response.data,
                    start: new Date(response.data.start),
                    end: new Date(response.data.end)
                };
                dispatch(onAddEvent(dataEvent));
            }).catch(error => {
                Swal.fire({title: "Error", text: "Hubo un error al guardar evento", icon: "error"});
            });
        }
    }

    const startDeleteEvent = (id) => {
        calendarApi.delete(`/api/event/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then(response => {
            dispatch(onDeleteEvent());
        }).catch(error => {
            Swal.fire({title: "Error", text: "Hubo un error al guardar evento", icon: "error"});
        });
    }

    return {
        events,
        activeEvent,
        hasActiveEvent: !!activeEvent,
        getAllEvents,
        setActiveEvent,
        startSavingEvent,
        startDeleteEvent
    }
}