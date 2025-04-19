import React from 'react'

export const NavBar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className='navbar-brand'><i className='fas fa-calendar-alt'></i> Luis Gerardo Valencia Camacho</span>
        <button className='btn btn-outline-danger btn-sm'>
            <i className='fas fa-sign-out-alt'></i>
            <span> Salir</span>
        </button>
    </div>
  )
}
