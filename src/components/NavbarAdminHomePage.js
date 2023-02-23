import './NavbarAdminHomePage.css'
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';


const NavbarAdminHomePage = () => {
  const [loggedInUser, setLoggedInUser] = useState({})

  const navigate = useNavigate()

  const logOut = () => {
    localStorage.removeItem('loggedInUser')
    setLoggedInUser({name: '', user: {}})
    navigate('/')
  }


  return (
    <nav className="NavbarAdminHomePage" >
      <div className='logout-link'>
        <ul>
          <li 
            className='logout-admin-home-page' 
            style={{listStyleType: "none"}}
            onClick={() => logOut(loggedInUser.jwt)}>
            <Link to={'/'} >Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavbarAdminHomePage