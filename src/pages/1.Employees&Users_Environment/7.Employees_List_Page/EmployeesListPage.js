import './EmployeeListPage.css'
import NavbarAdminAll from '../../../components/1.Components_Employees&Users_Environment/4.Navbar_Admin_All/NavbarAdminAll'
import axios from 'axios'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import SearchBarEmployee from '../../../components/1.Components_Employees&Users_Environment/5.Search_Bars/SearchBarEmployee'


const EmployeesListPage = props => {
  const [employees, setEmployees] = useState([])
  const [refresh] = useState(true)


  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  const headers = {
    Authorization: `Bearer ${loggedInUser.jwt}`
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/users`, { headers })
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
          <Link to='/sign-up/user'>
            <button
              type="button"
              className="btn btn-primary createNewUser-btn"
              id={loggedInUser.user.level !== "admin" ? "no-btn" : "enable-btn" }>
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
                  <img src={employee.imageUrl} className="card-img-top" alt="Employee Profile" style={{width: "150px", height: "150px", margin: "auto", marginTop: "16px", borderTopLeftRadius: "25%", borderBottomRightRadius: "25%"}} />
                  <div className="card-body">
                    <h5 className="card-title employee-name">{employee.name}</h5>
                    <p className="card-text employee-details"><span>Employee Code:</span> {employee.employeeCode}</p>
                    <p className="card-text employee-details"><span className="employee-detail">Position:</span> {employee.position}</p>
                    <p className="card-text employee-details"><span className="employee-detail">Department:</span> {employee.department}</p>
                    <a href={`/user/${employee._id}`} className="btn btn-primary employee-details-btn">Details</a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Link to={'/home'} style={{margin: "20px"}}>
        <p>Home</p>
      </Link>
    </div>
  )
}

export default EmployeesListPage