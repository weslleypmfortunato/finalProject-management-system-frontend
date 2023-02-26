import './UsersEnvironment.css'
import { Link } from "react-router-dom";

const CollaboratorsEnvironment = () => {
  return (
    <div className="cards">
      <Link to='/employees' className='card-description'>
        <div className="card users" style={{width: '18rem', height: "20rem"}}>
          <img src="https://res.cloudinary.com/weslley-m-fortunato/image/upload/v1677396327/rogers_images/jmdn7h9vz4p6yo9cnikh.png" className="card-img-top users-img" alt="Collaborators" style={{width: "12rem", margin: "auto"}} />
          <div className="card-body">
            <p className="card-text">Check employee's list and employee details</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CollaboratorsEnvironment