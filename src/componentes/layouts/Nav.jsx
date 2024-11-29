import React from 'react'
import {NavLink} from 'react-router-dom'

export const Nav = () => {
  return (
    <nav className="nav">
    <ul>
        <li><NavLink to="/inicio">inicio</NavLink></li>
        <li><NavLink to="/articulos">articulos</NavLink></li>
        <li><NavLink to="/crear">craer-articulos</NavLink></li>
        <li><NavLink to="">Contacto</NavLink></li>
    </ul>
</nav>
  )
}
