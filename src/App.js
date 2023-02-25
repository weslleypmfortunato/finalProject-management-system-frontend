import './App.css';
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CreateNewUserPage from './pages/CreateNewUserPage';
import EmployeesListPage from './pages/EmployeesListPage';
import CreateNewEmployeePage from './pages/CreateNewEmployeePage';
import EmployeeDetailsPage from './pages/EmployeeDetailsPage';
import EmployeeEditPage from './pages/EmployeeEditPage';
import UsersListPage from './pages/UsersListPage';
import UserDetailsPage from './pages/UserDetailsPage';
import UserEditPage from './pages/UserEditPage';
import FormerEmployeesListPage from './pages/FormerEmployeesList';
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
