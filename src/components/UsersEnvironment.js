import './UsersEnvironment.css'
import newUser from '../assets/images/newUserImage.png'
import { Link } from "react-router-dom";

const UsersEnvironment = () => {
  return (
    <div className="cards">
      <Link to='/users' className='card-description'>
        <div className="card users" style={{width: '18rem', height: "20rem"}}>
          <img src={ newUser } className="card-img-top users-img" alt="Collaborators" style={{width: "12rem", margin: "auto"}}/>
          <div className="card-body" style={{textDecoration: "none"}}>
            <p className="card-text" >Check users list, create new users to access differents environments and edit current users</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default UsersEnvironment