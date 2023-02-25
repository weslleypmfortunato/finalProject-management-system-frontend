import './HomePage.css'
import NavbarAdminHomePage from "../components/NavbarAdminHomePage";
import UsersEnvironment from '../components/UsersEnvironment';
import CollaboratorsEnvironment from '../components/CollaboratorsEnvironment';
import TimesheetEnvironment from '../components/TimesheetEnvironment';
import WarehouseMissingItemsEnvironment from '../components/WHMissingItems';

const HomePage = () => {

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  return (
    <div className="HomePage">
      <NavbarAdminHomePage />
      <div className="user-profileImg">
        <h1 className='welcome'>Welcome <span>{ loggedInUser.user.name.split(' ')[0] }</span>!</h1>
        <img src={ loggedInUser.user.imageUrl } alt="User" style={{width: "100px", height: "100px", borderRadius: "50%"}}/>
      </div>
      <div className="cards">
        <UsersEnvironment />
        <CollaboratorsEnvironment />
        <TimesheetEnvironment />
        <WarehouseMissingItemsEnvironment />
      </div>
    </div>
  )
}

export default HomePage