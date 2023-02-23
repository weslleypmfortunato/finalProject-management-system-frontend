import './EmployeeListPage.css'
import NavbarAdminAll from "../components/NavbarAdminAll"
import axios from 'axios'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


const EmployeesListPage = () => {
  const [employees, setEmployees] = useState([])
  const [userName, setUserName] = useState('')
  const [refresh] = useState(true)


  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  const headers = {
    Authorization: `Bearer ${loggedInUser.jwt}`
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/employee`, { headers })
      .then(response => {
        setEmployees(response.data)
        setUserName(loggedInUser.user.name)
      }).catch(error => console.log(error))
  }, [refresh])


  return (
    <div className="EmployeesListPage">
      <NavbarAdminAll />
      <h1 className='welcome-employee-list'>Hi {userName.split(' ')[0]}, this is the current Employee's List</h1>
      <div className="employees-list">
      <div className="createNewEmployee-formerEmployeeList-btns">
        <Link to='/sign-up/employee'>
          <button
            type="button"
            className="btn btn-primary createNewUser-btn">
            Create a New Employee
          </button>
        </Link>
        <button 
          type="button" 
          className="btn btn-primary formerEmployeeList-btn">
          Former Employee's List
        </button>
      </div>
        {employees.length > 0 && employees.map(employee => {
          return (
            <Link to={`/employee/${employee._id}`} className="link-employee-details">
              <div key={employee._id} className="employee">
                <p><span className="employee-detail">Name:</span> {employee.name} - <span className="employee-detail">Employee Number: </span> {employee.employeeCode} - <span className="employee-detail">Position:</span> {employee.position} - <span className="employee-detail">Department:</span> {employee.department}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
    
  )
}

export default EmployeesListPage