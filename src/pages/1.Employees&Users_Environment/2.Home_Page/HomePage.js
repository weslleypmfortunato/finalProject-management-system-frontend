import './HomePage.css'
import NavbarAdminHomePage from "../../../components/1.Components_Employees&Users_Environment/3.Navbar_Admin_Homepage/NavbarAdminHomePage";
import CollaboratorsEnvironment from '../../../components/1.Components_Employees&Users_Environment/2.Homepage_Cards/CollaboratorsEnvironment';
import TimesheetEnvironment from '../../../components/1.Components_Employees&Users_Environment/2.Homepage_Cards/TimesheetEnvironment';
import WarehouseMissingItemsEnvironment from '../../../components/1.Components_Employees&Users_Environment/2.Homepage_Cards/WHMissingItems';
import CheckTimesheet from '../../../components/1.Components_Employees&Users_Environment/2.Homepage_Cards/CheckTimesheet';

const HomePage = () => {

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  return (
    <div className='Homepage'>
      <NavbarAdminHomePage />
      <div className="user-profileImg">
        <img src={ loggedInUser.user.imageUrl } alt="User" style={{width: "60px", height: "60px", borderRadius: "50%"}}/>
        <h1 className='welcome'>Welcome <span>{ loggedInUser.user.name.split(' ')[0] }</span>!</h1>
      </div>
      <div className="cards">
        <CollaboratorsEnvironment />
        <TimesheetEnvironment />
        <CheckTimesheet />
        <WarehouseMissingItemsEnvironment />
      </div>
    </div>
  )
}

export default HomePage