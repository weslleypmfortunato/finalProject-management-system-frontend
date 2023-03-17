import './UsersEnvironment.css'
import { Link } from "react-router-dom";

const WarehouseMissingItemsEnvironment = () => {
  return (
    <div className="cards">
      <Link to='/missing-products' className='card-description'>
        <div className="card users" style={{width: '18rem', height: "20rem"}}>
          <img src="https://res.cloudinary.com/weslley-m-fortunato/image/upload/v1677396549/rogers_images/qpmoqscc55fndzie6owy.jpg" className="card-img-top users-img" alt="Timsheet" style={{width: "12rem", margin: "auto"}} />
          <div className="card-body">
            <p className="card-text">Add missing items and check for missing items updates</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default WarehouseMissingItemsEnvironment