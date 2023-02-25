import './EmployeeListPage.css'
import NavbarAdminAll from "../components/NavbarAdminAll"
import axios from 'axios'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import SearchBarEmployee from '../components/SearchBarEmployee'


const EmployeesListPage = () => {
  const [employees, setEmployees] = useState([])
  const [refresh] = useState(true)


  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  const headers = {
    Authorization: `Bearer ${loggedInUser.jwt}`
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/employee`, { headers })
      .then(response => {
        setEmployees(response.data)
      }).catch(error => console.log(error))
  }, [refresh])

  return (
    <div className="EmployeesListPage">
      <NavbarAdminAll />
      <SearchBarEmployee />
      <h1 className='welcome-employee-list'>Current Employees List</h1>
      <div className="employees-list">
        <div className="createNewEmployee-formerEmployeeList-btns">
          <Link to='/sign-up/employee'>
            <button
              type="button"
              className="btn btn-primary createNewUser-btn">
              Create a New Employee
            </button>
          </Link>
          <Link to='/former-employees'>
            <button
              type="button"
              className="btn btn-primary formerEmployeeList-btn">
              Former Employee's List
            </button>
          </Link>
        </div>
        <div className="employee-cards">
          {employees.length > 0 && employees.map(employee => {
            return (
              <div className="single-employee-card" style={{display: "flex", flexDirection: "row"}}>
                <div className="card employee-card" style={{width: "14rem"}}>
                  <img src={employee.imageUrl} className="card-img-top" alt="Employee Profile" style={{borderRadius: "50%"}} />
                  <div className="card-body">
                    <h5 className="card-title employee-name">{employee.name}</h5>
                    <p className="card-text employee-details"><span>Employee Code:</span> {employee.employeeCode}</p>
                    <p className="card-text employee-details"><span className="employee-detail">Position:</span> {employee.position}</p>
                    <p className="card-text employee-details"><span className="employee-detail">Department:</span> {employee.department}</p>
                    <a href={`/employee/${employee._id}`} className="btn btn-primary employee-details-btn">Details</a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Link to={'/homepage'} style={{margin: "20px"}}>
        <p>Home</p>
      </Link>
    </div>
  )
}

export default EmployeesListPage