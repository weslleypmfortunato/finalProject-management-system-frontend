import './App.css';
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/1.Employees&Users_Environment/1.Login_Page/LoginPage'
import HomePage from './pages/1.Employees&Users_Environment/2.Home_Page/HomePage';
import CreateNewUserPage from './pages/1.Employees&Users_Environment/4.Create_New_User_Page/CreateNewUserPage';
import EmployeesListPage from './pages/1.Employees&Users_Environment/7.Employees_List_Page/EmployeesListPage';
import CreateNewEmployeePage from './pages/1.Employees&Users_Environment/8.Create_New_Employee_Page/CreateNewEmployeePage';
import EmployeeDetailsPage from './pages/1.Employees&Users_Environment/9.Employee_Details_Page/EmployeeDetailsPage';
import EmployeeEditPage from './pages/1.Employees&Users_Environment/10.Employee_Edit_Page/EmployeeEditPage';
import UsersListPage from './pages/1.Employees&Users_Environment/3.Users_List_Page/UsersListPage';
import UserDetailsPage from './pages/1.Employees&Users_Environment/5.User_Details_Page/UserDetailsPage';
import UserEditPage from './pages/1.Employees&Users_Environment/6.User_Edit_Page/UserEditPage';
import FormerEmployeesListPage from './pages/1.Employees&Users_Environment/11.Former_Employees_List_Page/FormerEmployeesList';
import IsLogged from './components/Islogged';
import IsGuest from './components/IsGuest';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <IsGuest> <LoginPage /> </IsGuest> } />
        <Route path='/home' element={ <IsLogged> <HomePage /> </IsLogged>} />
        <Route path='/sign-up/user' element={ <IsLogged roles={["admin"]}> <CreateNewUserPage /> </IsLogged> } />
        <Route path='/sign-up/employee' element={ <IsLogged roles={["admin"]}> <CreateNewEmployeePage /> </IsLogged>} />
        <Route path='/employees' element={ <IsLogged> <EmployeesListPage /> </IsLogged> } />
        <Route path='/employee/:employeeId' element={ <EmployeeDetailsPage />} />
        <Route path='/employee/edit/:employeeId' element={ <IsLogged roles={["admin"]}> <EmployeeEditPage /> </IsLogged> } />
        <Route path='/users' element={ <IsLogged roles={["admin"]}> <UsersListPage /> </IsLogged> } />
        <Route path='/user/:userId' element={ <IsLogged roles={["admin"]}> <UserDetailsPage /> </IsLogged> } />
        <Route path='/user/edit/:userId' element={ <IsLogged roles={["admin"]}> <UserEditPage /> </IsLogged> } />
        <Route path='/former-employees' element={ <FormerEmployeesListPage /> } />
      </Routes>
    </div>
  );
}

export default App;
