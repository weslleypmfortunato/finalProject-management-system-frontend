import './EmployeeListPage.css'
import NavbarAdminAll from "../components/NavbarAdminAll"
import axios from 'axios'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


const FormerEmployeesListPage = () => {
  const [formerEmployees, setFormerEmployees] = useState([])
  const [refresh] = useState(true)


  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  const headers = {
    Authorization: `Bearer ${loggedInUser.jwt}`
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/former-employee`, { headers })
      .then(response => {
        setFormerEmployees(response.data)
      }).catch(error => console.log(error))
  }, [refresh])

  return (
    <div className="EmployeesListPage">
      <NavbarAdminAll />
      <h1 className='welcome-employee-list'>Former Employees List</h1>
      <div className="employees-list">
        {formerEmployees.length > 0 && formerEmployees.map(formerEmployee => {
          return (
            <Link to={`/employee/${formerEmployee._id}`} className="link-employee-details">
              <div key={formerEmployee._id} className="employee">
                <p><span className="employee-detail">Name:</span> {formerEmployee.name} - <span className="employee-detail">Employee Number: </span> {formerEmployee.employeeCode} - <span className="employee-detail">Position:</span> {formerEmployee.position} - <span className="employee-detail">Department:</span> {formerEmployee.department}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
    
  )
}

export default FormerEmployeesListPage