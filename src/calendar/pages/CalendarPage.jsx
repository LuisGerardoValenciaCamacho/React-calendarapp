import { useState } from 'react'
import { Calendar } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { NavBar, CalendarEvent, CalendarModal } from '../'
import { getMessagesEs, localizer } from '../../helpers';
import { addHours } from 'date-fns';

const events = [{
    title: "Cumpleaños del jefe",
    notes: "Hay que comprar el pastel",
    start: new Date(),
    end: addHours(new Date(), 1),
    bgColor: "#14ab14",
    user: {
        _id: 123,
        name: "Gerardo valencia"
    }
}]


export const CalendarPage = () => {

    const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "week");

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: "#14ab14",
            borderRadius: "0px",
            opacity: 0.8,
            color: "white"
        }
        return {
            style
        }
    }
    
    const onDoubleClick = (event) => {
        console.log({ doubleClick: event });
    }
    
    const onSelect = (event) => {
        console.log({ onSelect: event });
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
        </>
    )
}
