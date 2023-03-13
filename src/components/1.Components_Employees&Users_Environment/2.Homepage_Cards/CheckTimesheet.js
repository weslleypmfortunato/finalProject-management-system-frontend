import './UsersEnvironment.css'
import { Link } from "react-router-dom";

const CheckTimesheet = () => {
  return (
    <div className="cards">
      <Link to='/my-timesheet' className='card-description'>
        <div className="card users" style={{width: '18rem', height: "20rem"}}>
          <img src="https://res.cloudinary.com/weslley-m-fortunato/image/upload/v1678508719/rogers_images/dinj91jwzktqpjwtejol.png" className="card-img-top users-img" alt="Timsheet" style={{width: "17.9rem", margin: "auto"}} />
          <div className="card-body">
            <p className="card-text">Check your timesheet details and status</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CheckTimesheet