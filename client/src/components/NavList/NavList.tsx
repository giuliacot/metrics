import * as React from 'react'
import { NavLink } from 'react-router-dom'
import style from './NavList.module.scss'

export function NavList() {
  return (
    <nav>
      <ul className={style.navWrapper}>
        <li className={style.navLink}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? style.active : ''} ${style.link}`
            }
          >
            Setup
          </NavLink>
        </li>
        <li className={style.navLink}>
          <NavLink
            to="/view"
            className={({ isActive }) =>
              `${isActive ? style.active : ''} ${style.link}`
            }
          >
            Table view
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
