import { useEffect, useState } from 'react'
import { Calendar } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { NavBar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../'
import { getMessagesEs, localizer } from '../../helpers';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';

export const CalendarPage = () => {

    const { openDateModal } = useUiStore();
    const { events, setActiveEvent, getAllEvents } = useCalendarStore();
    const [ lastView, setLastView ] = useState(localStorage.getItem("lastView") || "week");

    useEffect(() => {
        getAllEvents(); 
    }, [])

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: event.bgColor,
            borderRadius: "0px",
            opacity: 0.8,
            color: "white"
        }
        return {
            style
        }
    }
    
    const onDoubleClick = () => {
        openDateModal();
    }
    
    const onSelect = (event) => {
        setActiveEvent(event);
    }
    
    const onViewChanged = (event) => {
        setLastView(event);
        localStorage.setItem("lastView", event);
    }

    return (
        <>
            <NavBar />
            <Calendar
                culture='es'
                localizer={ localizer }
                events={ events }
                defaultView={ lastView }
                startAccessor="start"
                endAccessor="end"
                style={{ height: "calc(100vh - 80px" }}
                messages={getMessagesEs()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelect }
                onView={ onViewChanged }
            />
            <CalendarModal />
            <FabAddNew />
            <FabDelete/>
        </>
    )
}
