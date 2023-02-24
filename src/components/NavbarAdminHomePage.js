import './NavbarAdminHomePage.css'
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/auth.context';


const NavbarAdminHomePage = props => {
  const [loggedInUser, setLoggedInUser] = useState({})
  const [employee] = useState('')

  const {logout} = useContext(AuthContext)

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
            onClick={() => logout(employee.jwt)}>
            <Link to={'/'} >Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavbarAdminHomePage