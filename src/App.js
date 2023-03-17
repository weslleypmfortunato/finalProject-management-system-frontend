import './App.css';
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/1.Employees&Users_Environment/1.Login_Page/LoginPage'
import HomePage from './pages/1.Employees&Users_Environment/2.Home_Page/HomePage';
import CreateNewUserPage from './pages/1.Employees&Users_Environment/4.Create_New_User_Page/CreateNewUserPage';
import EmployeesListPage from './pages/1.Employees&Users_Environment/7.Employees_List_Page/EmployeesListPage';
import UserDetailsPage from './pages/1.Employees&Users_Environment/5.User_Details_Page/UserDetailsPage';
import UserEditPage from './pages/1.Employees&Users_Environment/6.User_Edit_Page/UserEditPage';
import FormerEmployeesListPage from './pages/1.Employees&Users_Environment/11.Former_Employees_List_Page/FormerEmployeesList';
import IsLogged from './components/1.Components_Employees&Users_Environment/6.Route_Access_Authorization/Islogged'
import IsGuest from './components/1.Components_Employees&Users_Environment/6.Route_Access_Authorization/IsGuest'
import TimesheetAdminPage from './pages/2.Timesheet_Environment/3.Timesheet_Admin_Page/TimesheetAdminPage.js.js';
import ClockInClockOutPage from './pages/2.Timesheet_Environment/1.ClockIn_ClockOut_Page/ClockInClockOutPage';
import TimesheetByPerson from './pages/2.Timesheet_Environment/2.My_Timesheet_Page/MyTimesheetPage.js'
import TimesheetDetailsPage from './pages/2.Timesheet_Environment/4.Timesheet_Details_Page/TimesheetDetailsPage';
import ProductsListPage from './pages/3.Warehouse_Environment/ProductsListPage';
import CreateNewProductPage from './pages/3.Warehouse_Environment/CreateNewProductPage';
import ProductEditPage from './pages/3.Warehouse_Environment/ProductEditPage';
import TimesheetEditPage from './pages/2.Timesheet_Environment/5.Timesheet_Edit_Page/TimesheetEditPage';
import MissingProductPage from './pages/3.Warehouse_Environment/MissingProductsPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <IsGuest> <LoginPage /> </IsGuest> } />
        <Route path='/home' element={ <IsLogged> <HomePage /> </IsLogged>} />
        <Route path='/sign-up/user' element={ <IsLogged roles={["admin"]}> <CreateNewUserPage /> </IsLogged> } />
        <Route path='/employees' element={ <IsLogged> <EmployeesListPage /> </IsLogged> } />
        <Route path='/user/:userId' element={ <IsLogged roles={["admin", "supervisor", "user"]}> <UserDetailsPage /> </IsLogged> } />
        <Route path='/user/edit/:userId' element={ <IsLogged roles={["admin"]}> <UserEditPage /> </IsLogged> } />
        <Route path='/former-employees' element={ <FormerEmployeesListPage /> } />
        <Route path='/timesheet' element={ <IsLogged roles={["admin", "supervisor"]}><TimesheetAdminPage /></IsLogged>} />
        <Route path='/timesheet/clockin-clockout' element={ <ClockInClockOutPage /> } />
        <Route path='/my-timesheet' element={ <IsLogged><TimesheetByPerson /></IsLogged> } />
        <Route path='/timesheet/:id' element={ <IsLogged roles={["admin", "supervisor"]}><TimesheetDetailsPage /></IsLogged> } />
        <Route path='/timesheet/edit/:timesheetEmployeeId' element={ <IsLogged roles={["admin", "user"]} > <TimesheetEditPage /> </IsLogged> } />
        <Route path='/products' element={ <IsLogged><ProductsListPage /></IsLogged> } />
        <Route path='/products/new' element={ <IsLogged roles={["admin"]}> <CreateNewProductPage /> </IsLogged> } />
        <Route path='/product/edit/:productId' element={ <IsLogged roles={["admin"]}> <ProductEditPage /> </IsLogged> } />
        <Route path='/missing-products' element={ <IsLogged> <MissingProductPage /> </IsLogged> } />
      </Routes>
    </div>
  );
}

export default App;
