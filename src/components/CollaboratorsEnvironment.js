import './UsersEnvironment.css'
import collaborators from '../assets/images/collaborators_img.png'
import { Link } from "react-router-dom";

const CollaboratorsEnvironment = () => {
  return (
    <div className="cards">
      <Link to='/employees' className='card-description'>
        <div className="card users" style={{width: '18rem', height: "20rem"}}>
          <img src={ collaborators } className="card-img-top users-img" alt="Collaborators" style={{width: "12rem", margin: "auto"}}/>
          <div className="card-body">
            <p className="card-text">Check employee's list and employee details</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CollaboratorsEnvironment