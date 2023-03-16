import './TimesheetAdminPage.css'
import NavbarAdminAll from '../../../components/1.Components_Employees&Users_Environment/4.Navbar_Admin_All/NavbarAdminAll';
import axios from 'axios'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'


const TimesheetAdminPage = () => {

  const fifteenDaysBefore = new Date(Date.now() - ( 3600 * 1000 * 24 * 15))

  const [timesheets, setTimesheets] = useState([])
  const [startDate, setStartDate] = useState(fifteenDaysBefore.toJSON().slice(0,10).replace('/','-'))
  const [endDate, setEndDate] = useState(new Date().toJSON().slice(0,10).replace('/','-'))

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

  const handleSubmit = e => {
    e.preventDefault()

    axios.get(`${process.env.REACT_APP_API_URL}/timesheet?startDate=${startDate}&endDate=${endDate}`, { headers })
    .then(response => {
      setTimesheets(response.data)
    }).catch (error => {
      messageError(error.response.data.message)
    })
  }

  return (
    <div className="TimesheetAdminPage">
      <NavbarAdminAll />
      <h1 className='header-timesheet'>Timesheet Control</h1>
      <form>
        <div className="initial-final-date">
          <input
            type="date"
            className='initial-date'
            name="startDate"            
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className='final-date'
            name="endDate"            
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary search-timesheet"
          onClick={handleSubmit}
        >Search
        </button>
      </form>
      <div className="timesheets">
      
        <table className="table table-hover table-sm">
          <thead>
            <tr>
              <th scope="col" className='details-table'>Name</th>
              <th scope="col" className='details-table'>Employee Code</th>
              <th scope="col" className='details-table'>Department</th>
              <th scope="col" className='details-table'>Worked Hours</th>
              <th scope="col" className='details-table'>Details</th>
            </tr>
          </thead>

          {timesheets.length > 0 && timesheets.map(timesheet => {
            
            return (
              <tbody key={timesheet._id}>
                <tr>
                  <th scope="row">{timesheet.name}</th>
                  <td>{timesheet.employeeCode}</td>
                  <td>{timesheet.department}</td>
                  <td>{timesheet.totalHours}</td>
                  <td>
                    <Link to={`/timesheet/${timesheet._id}`} target="_blank" rel='noopener noreferrer'>Details</Link> 
                  </td>
                </tr>
              </tbody>
            )
          })}
        </table>
        <Link to={'/home'} style={{margin: "20px"}}>
          <p>Home</p>
        </Link>
      </div>
    </div>
  )
}

export default TimesheetAdminPage
