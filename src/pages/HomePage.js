import './HomePage.css'
import { Link } from "react-router-dom";
import NavbarAdminHomePage from "../components/NavbarAdminHomePage";
import collaborators from '../assets/images/collaborators_img.png'
import timesheet from '../assets/images/timesheet_img.png.webp'
import whMissingItems from '../assets/images/wh_img.jpg'
import newUser from '../assets/images/newUserImage.png'

const HomePage = () => {

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  return (
    <div className="HomePage">
      <NavbarAdminHomePage />
      <h1 className='welcome'>Welcome <span>{ loggedInUser.user.name.split(' ')[0] }</span>!</h1>
      <div className="cards">
        <Link to='/sign-up/user'>
          <div className="card collaborators" style={{width: '18rem'}}>
            <img src={ newUser } className="card-img-top collaborators-img" alt="Collaborators" />
            <div className="card-body">
              <p className="card-text">Create new users to access differents environments aloowing them to do different activities</p>
            </div>
          </div>
        </Link>
        <Link to='/employees'>
          <div className="card collaborators" style={{width: '18rem'}}>
            <img src={ collaborators } className="card-img-top collaborators-img" alt="Collaborators" />
            <div className="card-body">
              <p className="card-text">Check employee's list, add new user, edit user and check user details</p>
            </div>
          </div>
        </Link>
        <div className="card timesheet" style={{width: '18rem'}}>
          <img src={ timesheet } className="card-img-top timesheet-img" alt="Timesheet" />
          <div className="card-body">
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
        <div className="card wh-missing-items" style={{width: '18rem'}}>
          <img src={ whMissingItems } className="card-img-top wh-img" alt="Warehouse" />
          <div className="card-body">
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage