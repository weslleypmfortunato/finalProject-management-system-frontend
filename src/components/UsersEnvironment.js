import './UsersEnvironment.css'
import { Link } from "react-router-dom";

const UsersEnvironment = () => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  return (
    <div className="cards">
      <Link to='/users' 
        className='card-description'
        id={loggedInUser.user.level !== "admin" ? "no-btn" : "enable-btn"}
      >
        <div className="card users" style={{width: '18rem', height: "20rem"}}>
          <img src="https://res.cloudinary.com/weslley-m-fortunato/image/upload/v1677396234/rogers_images/i3godmdmhxhbcqdsczgn.png" className="card-img-top users-img" alt="Collaborators" style={{width: "12rem", margin: "auto"}} />
          <div className="card-body" style={{textDecoration: "none"}}>
            <p className="card-text" >Check users list, create new users to access differents environments and edit current users</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default UsersEnvironment