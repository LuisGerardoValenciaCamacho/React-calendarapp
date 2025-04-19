import { useDispatch, useSelector } from "react-redux"
import { onAddEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);

    const setActiveEvent = ( calendarEvent ) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async( calendarEvent ) => {
        if(calendarEvent._id) {
            dispatch(onUpdateEvent(calendarEvent));
        } else {
            dispatch(onAddEvent({ ...calendarEvent, _id: new Date().getTime() }));
        }
    }

    const startDeleteEvent = () => {
        dispatch(onDeleteEvent());
    }

    return {
        events,
        activeEvent,
        hasActiveEvent: !!activeEvent,
        setActiveEvent,
        startSavingEvent,
        startDeleteEvent
    }
}