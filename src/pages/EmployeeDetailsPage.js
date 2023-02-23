import './EmployeeDetailsPage.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavbarAdminAll from '../components/NavbarAdminAll';

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
        <h1 style={{margin: "20px, 0"}}>{ employee.name.split(' ')[0] } Details</h1>
        <Link to={`/employee/edit/${employee._id}`}>
          <button
            type="button"
            className="btn btn-primary edit-employee-btn"
            style={{width: "170px"}}>Update Information
          </button>
        </Link>
      </div>
      <div className="employee-img">
        <img src={ employee.imageUrl } style={{height: "150px"}} alt="Employee" />
        <div className="info">
          <p><span className="employee-info">Name:</span> { employee.name }</p>
          <p><span className="employee-info">Employee Code: </span>{ employee.employeeCode }</p>
          <p><span className="employee-info">Date of birthday: </span>{ employee.dob }</p>
          <p><span className="employee-info">Level: </span>{ employee.level }</p>
          <p><span className="employee-info">Started at: </span>{ employee.startingDate }</p>
          <p><span className="employee-info">Department: </span>{ employee.department }</p>
          <p><span className="employee-info">Current position: </span>{ employee.position }</p>
          <p><span className="employee-info">Emergency contact: </span>{ employee.emergencyContact }</p>
          <p><span className="employee-info">Comments: </span>{ employee.comments }</p>
        </div>
      </div>
      
    </div>
  )



}

export default EmployeeDetailsPage