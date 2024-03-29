import '../7.Employees_List_Page/EmployeeListPage.css'
import NavbarAdminAll from '../../../components/1.Components_Employees&Users_Environment/4.Navbar_Admin_All/NavbarAdminAll'
import axios from 'axios'
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import SearchBarFormerEmployee from '../../../components/1.Components_Employees&Users_Environment/5.Search_Bars/SearchBarFormerEmployee'
import Swal from 'sweetalert2'

const FormerEmployeesListPage = () => {
  const [formerEmployees, setFormerEmployees] = useState([])
  const [refresh] = useState(true)

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  const headers = {
    Authorization: `Bearer ${loggedInUser.jwt}`
  }

  const messageError = (text) => {
      Swal.fire({
      text,
      imageUrl: "https://res.cloudinary.com/weslley-m-fortunato/image/upload/v1677396949/rogers_images/lfn5fdhvz3tcezcagj1s.png",
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: 'Custom image',
    })
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/former-employee`, { headers })
      .then(response => {
        setFormerEmployees(response.data)
      }).catch (error => {
        messageError(error.response.data.message)
      })
  }, [refresh])

  return (
    <div className="EmployeesListPage">
      <NavbarAdminAll />
      <SearchBarFormerEmployee />
      <h1 className='welcome-employee-list'>Former Employees List</h1>
      <div className="employee-cards">
        {formerEmployees.length > 0 && formerEmployees.map(formerEmployee => {
          return (
            <div key={formerEmployee._id} className="single-employee-card" style={{display: "flex", flexDirection: "row"}}>
              <div className="card employee-card" style={{width: "14rem"}}>
              <img src={formerEmployee.imageUrl} className="card-img-top" alt="Employee Profile" style={{width: "150px", height: "150px", margin: "auto", marginTop: "16px", borderTopLeftRadius: "25%", borderBottomRightRadius: "25%"}} />
                <div className="card-body">
                  <h5 className="card-title employee-name">{formerEmployee.name}</h5>
                  <p className="card-text employee-details"><span>Employee Code:</span> {formerEmployee.employeeCode}</p>
                  <p className="card-text employee-details"><span className="employee-detail">Position:</span> {formerEmployee.position}</p>
                  <p className="card-text employee-details"><span className="employee-detail">Department:</span> {formerEmployee.department}</p>
                  <a href={`/user/${formerEmployee._id}`} className="btn btn-primary employee-details-btn">Details</a>
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