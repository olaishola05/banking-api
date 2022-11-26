import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../../utils';
import classes from './Layout.module.css'

const Navigation = () => {
  const isLoggedIn = localStorage.getItem('token');

  const logoutHandler = () => {
    logout();
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Ficti Bank</div>
      <nav>
        <ul>
          {isLoggedIn ? (
            <>
              <li>
                Hello!
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>

              <li onClick={logoutHandler}>
                <Link to="/login">Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signup">Signup</Link>
              </li>

              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Navigation