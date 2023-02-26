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
        <img src={ loggedInUser.user.imageUrl } alt="User" style={{width: "60px", height: "60px", borderRadius: "50%"}}/>
        <h1 className='welcome'>Welcome <span>{ loggedInUser.user.name.split(' ')[0] }</span>!</h1>
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