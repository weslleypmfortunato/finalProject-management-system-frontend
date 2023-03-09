import './TimesheetAdminPage.css'
import NavbarAdminAll from '../../../components/1.Components_Employees&Users_Environment/4.Navbar_Admin_All/NavbarAdminAll'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment-timezone'


const TimesheetAdminPage = () => {
  const [timesheets, setTimesheets] = useState([])
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [refresh] = useState(true)

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  const headers = {
    Authorization: `Bearer ${loggedInUser.jwt}`
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/timesheet`, { headers })
      .then(response => {
        setTimesheets(response.data)
      }).catch (error => console.log(error))
  }, [refresh])

  return (
    <div className="TimesheetAdminPage">
      <NavbarAdminAll />
      <h1 className='header-timesheet'>Timesheet Control</h1>
      <div className="initial-final-date">
        <input
          type="date"
          className='initial-date'
          name="startDate"
          id=""
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className='final-date'
          name="endDate"
          id=""
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
        />
      </div>
      <button type="button" className="btn btn-primary search-timesheet">Search</button>
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
            
            console.log("TIMESHEET ==>",  timesheet)
            return (
              <tbody key={timesheet._id}>
                <tr>
                  <th scope="row">{timesheet.name}</th>
                  <td>{timesheet.employeeCode}</td>
                  <td>{timesheet.department}</td>
                  <td>{timesheet.totalHours}</td>
                  <td>
                    <Link >Details</Link>
                  </td>
                </tr>
              </tbody>
            )
          })}
        </table>
      </div>
    </div>
  )
}

export default TimesheetAdminPage
