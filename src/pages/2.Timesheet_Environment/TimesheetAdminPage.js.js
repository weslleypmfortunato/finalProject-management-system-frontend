import './TimesheetAdminPage.css'
import NavbarAdminAll from '../../components/1.Components_Employees&Users_Environment/4.Navbar_Admin_All/NavbarAdminAll'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const TimesheetAdminPage = () => {
  const [timesheets, setTimesheets] = useState([])
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [refresh, setRefresh] = useState(true)

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
      <h1>Timesheet Control</h1>
      <input 
        type="date" 
        name="startDate" 
        id="" 
        value={startDate}
        onChange={e => setStartDate(e.target.value)}  
      />
      <input 
        type="date" 
        name="endDate" 
        id="" 
        value={endDate}
        onChange={e => setEndDate(e.target.value)}  
      />
      <div className="timesheets">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Employee Code</th>
            <th scope="col">Department</th>
            <th scope="col">Worked Hours</th>
            <th scope="col">Details</th>
          </tr>
        </thead>
        {timesheets.length > 0 && timesheets.map(timesheet => {
          return (
            <tbody>
            {timesheet.clockIn && 
              <tr>
                <th scope="row">{timesheet.employeeId.name}</th>
                <td>{timesheet.employeeId.employeeCode}</td>
                <td>{timesheet.employeeId.department}</td>
                <td>Ver como somar hrs</td>
                <td>Click here for details</td>
              </tr>}
            </tbody>
          )
        })}
      </table>
      </div>

    </div>
  )





}

export default TimesheetAdminPage
