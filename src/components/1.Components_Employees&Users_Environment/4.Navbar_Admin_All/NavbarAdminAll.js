import './NavbarAdminAll.css'
import { Link } from "react-router-dom";
import { AuthContext } from '../../../contexts/auth.context';
import { useContext, useState } from 'react';

const NavbarAdminAll = props => {
  const [employee] = useState('')

  const { logout } = useContext(AuthContext)

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  return (
    <nav className='NavbarAdminAll'>
      <div className="links">
        <ul>
          <li 
            className='admin-all-link' 
            style={{listStyleType: "none"}}>
            <Link to='/home'>Home</Link>
          </li>
          <li 
            className='admin-all-link' 
            style={{listStyleType: "none"}}>
            <Link to='/employees'>Employees List</Link>
          </li>
          <li 
            className='admin-all-link' 
            style={{listStyleType: "none"}}>
            Timesheet
          </li>
          <li 
            className='admin-all-link' 
            style={{listStyleType: "none"}}>
            Warehouse Missing Items
          </li>
          <li 
            className='admin-all-link admin-all-logout' 
            style={{listStyleType: "none"}}
            onClick={() => logout(employee.jwt)}>
            <Link to={'/'}>Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavbarAdminAll