import './EmployeeListPage.css'
import NavbarAdminAll from "../components/NavbarAdminAll"
import axios from 'axios'
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import SearchBarFormerEmployee from '../components/SearchBarFormerEmployee'


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
      <SearchBarFormerEmployee />
      <h1 className='welcome-employee-list'>Former Employees List</h1>
      <div className="employee-cards">
        {formerEmployees.length > 0 && formerEmployees.map(formerEmployee => {
          return (
            <div className="single-employee-card" style={{display: "flex", flexDirection: "row"}}>
              <div className="card employee-card" style={{width: "14rem"}}>
                <img src={formerEmployee.imageUrl} className="card-img-top" alt="Employee Profile" />
                <div className="card-body">
                  <h5 className="card-title employee-name">{formerEmployee.name}</h5>
                  <p className="card-text employee-details"><span>Employee Code:</span> {formerEmployee.employeeCode}</p>
                  <p className="card-text employee-details"><span className="employee-detail">Position:</span> {formerEmployee.position}</p>
                  <p className="card-text employee-details"><span className="employee-detail">Department:</span> {formerEmployee.department}</p>
                  <a href={`/employee/${formerEmployee._id}`} className="btn btn-primary employee-details-btn">Details</a>
              </div>
            </div>
      </div>
          )
        })}
    </div>
    <Link to={'/employees'} style={{margin: "20px"}}>
      <p>Back</p>
    </Link>
  </div>  
  )
}

export default FormerEmployeesListPage