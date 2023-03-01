import './EmployeeDetailsPage.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavbarAdminAll from '../../../components/1.Components_Employees&Users_Environment/4.Navbar_Admin_All/NavbarAdminAll'

const EmployeeDetailsPage = props => {
  const [employee, setEmployee] = useState(null)

  const { employeeId } = useParams()

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  const headers = {
    Authorization: `Bearer ${loggedInUser.jwt}`
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/employee/${employeeId}`, { headers })
      .then(response => {
        setEmployee(response.data)
      }).catch(error => console.log(error))
  }, [])

  if (!employee) {
    return <p>Loading...</p>
  }

  return (
    <div className="EmployeeDetailsPage">
      <NavbarAdminAll />
      <div className="h1-btn">
        <h1 style={{margin: "20px, 0"}}>{ employee.name.split(' ')[0] }'s Details</h1>
          <button
            className="btn btn-primary edit-employee-btn"
            id={employee.currentStatus === true || loggedInUser.user.level !== "admin" ? "no-btn" : "enable-btn"}
            type="button"
            style={{width: "170px"}}
          ><Link to={`/employee/edit/${employee._id}`}>Update Information</Link>
          </button>
      </div>
      <div className="employee-img">
        <img src={ employee.imageUrl } style={{height: "150px", borderRadius: "5px"}} alt="Employee" />
        <div className="info">
          <p><span className="employee-info">Name:</span> { employee.name }</p>
          <p><span className="employee-info">Employee Code: </span>{ employee.employeeCode }</p>
          <p><span className="employee-info">Date of birthday: </span>{ employee.dob }</p>
          <p><span className="employee-info">Phone Number </span>{ employee.phoneNumber }</p>
          <p><span className="employee-info">Started at: </span>{ employee.startingDate }</p>
          <p><span className="employee-info">Department: </span>{ employee.department }</p>
          <p><span className="employee-info">Current position: </span>{ employee.position }</p>
          <p><span className="employee-info">Emergency contact: </span>{ employee.emergencyContact }</p>
          <p><span className="employee-info">Comments: </span>{ employee.comments }</p>
        </div>
      </div>
      <Link to={'/employees'}>
        <p>Back</p>
      </Link>
    </div>
  )
}

export default EmployeeDetailsPage