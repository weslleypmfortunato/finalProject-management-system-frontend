import './App.css';
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CreateNewUserPage from './pages/CreateNewUserPage';
import EmployeesListPage from './pages/EmployeesListPage';
import CreateNewEmployeePage from './pages/CreateNewEmployeePage';
import EmployeeDetailsPage from './pages/EmployeeDetailsPage';
import EmployeeEditPage from './pages/EmployeeEditPage';


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
      </Routes>
    </div>
  );
}

export default App;
