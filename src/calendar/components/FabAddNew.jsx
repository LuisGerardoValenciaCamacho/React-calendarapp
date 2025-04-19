import React from 'react'
import { useCalendarStore, useUiStore } from '../../hooks'
import { addHours } from 'date-fns';

export const FabAddNew = () => {

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handlerClickNew = () => {
        setActiveEvent({
            title: "",
            notes: "",
            start: new Date(),
            end: addHours(new Date(), 1),
            bgColor: "#14ab14",
            user: {
            _id: 123,
                name: "Gerardo valencia"
            }
        })
        openDateModal()
    }

    return (
        <button
            className='btn btn-primary fab'
            onClick={ handlerClickNew }
        >
            <i className='fa fa-plus'></i>
        </button>
    )
}
