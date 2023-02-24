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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <LoginPage /> } />
        <Route path='/homepage' element={ <HomePage /> } />
        <Route path='/sign-up/user' element={ <CreateNewUserPage /> } />
        <Route path='/sign-up/employee' element={ <CreateNewEmployeePage />} />
        <Route path='/employees' element={ <EmployeesListPage /> } />
        <Route path='/employee/:employeeId' element={ <EmployeeDetailsPage />} />
        <Route path='/employee/edit/:employeeId' element={ <EmployeeEditPage /> } />
        <Route path='/users' element={ <UsersListPage /> } />
        <Route path='/user/:userId' element={ <UserDetailsPage /> } />
        <Route path='/user/edit/:userId' element={ <UserEditPage /> } />
        <Route path='/former-employees' element={ <FormerEmployeesListPage /> } />
      </Routes>
    </div>
  );
}

export default App;
