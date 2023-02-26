import './UsersEnvironment.css'
import { Link } from "react-router-dom";

const TimesheetEnvironment = () => {
  return (
    <div className="cards">
      <Link to='' className='card-description'>
        <div className="card users" style={{width: '18rem', height: "20rem"}}>
          <img src="https://res.cloudinary.com/weslley-m-fortunato/image/upload/v1677396442/rogers_images/purh6qwnvjeamce9darp.webp" className="card-img-top users-img" alt="Timsheet" style={{width: "18rem", margin: "auto"}} />
          <div className="card-body">
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default TimesheetEnvironment