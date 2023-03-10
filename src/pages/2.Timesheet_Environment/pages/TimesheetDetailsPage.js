import './MyTimesheetPage.css'
import NavbarAdminAll from '../../../components/1.Components_Employees&Users_Environment/4.Navbar_Admin_All/NavbarAdminAll';
import axios from "axios";
import { useEffect, useState } from "react";
import moment from 'moment-timezone'
import { useParams, Link } from 'react-router-dom';
require('moment-precise-range-plugin')

const TimesheetDetailsPage = () => {
  const [timesheets, setTimesheets] = useState([])
  const [status, setStatus] = useState(false)
  const [refresh] = useState(true)

  const moment = require("moment");
  const momentDurationFormatSetup = require("moment-duration-format");

  const { id } = useParams()

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  const headers = {
  Authorization: `Bearer ${loggedInUser.jwt}`
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/timesheet/${id}`, { headers })
    .then(response => {
      setTimesheets(response.data)
    }).catch(error => console.log(error))
  }, [ refresh ])

  // const handleSubmit = e => {
  //   e.preventDefault()
  //   const editTimesheet = { status }

  //   axios.put(`${process.env.REACT_APP_API_URL}/user/edit/${employeeId}`, editTimesheet)
  //     .then(response => {
  //     }).catch(error => console.log(error))
  // }

  return (
    <div className="TimesheetByPerson">
      <NavbarAdminAll />
      <div className="image-h1-myTimesheet">
        <h1 className='h1-my-timesheet'>Timesheet Validation Page</h1>
      </div>

      <table className="table table-hover table-sm align-middle">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Employee Code</th>
            <th scope="col">Date</th>
            <th scope="col">Clock In</th>
            <th scope="col">Clock Out</th>
            <th scope="col">Worked Hours</th>
            <th scope="col">Approve</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        {timesheets.length > 0 && timesheets.map(timesheet => {
          return (
            <tbody key={timesheet._id}>
              <tr>
                <th scope="row">{timesheet.employeeId.name}</th>
                <td>{timesheet.employeeId.employeeCode}</td>
                <td>{timesheet.clockIn.split('T')[0]}</td>
                <td>{timesheet.clockIn.substr(11, 5)}</td>
                <td>{timesheet.clockOut.substr(11, 5)}</td>
                {timesheet.clockOut !== null && timesheet.employeeId.fulltime === true &&
                  <td>{ moment.duration(((moment(timesheet.clockOut).diff(timesheet.clockIn))/1000 - 1800), "seconds").format("h:mm") }</td>
                }
                {timesheet.clockOut === null && timesheet.employeeId.fulltime === true && 
                <td><b>Waiting for Clock out</b></td> }
                {timesheet.clockOut !== null && timesheet.employeeId.fulltime === false &&
                  <td>{ moment.duration(((moment(timesheet.clockOut).diff(timesheet.clockIn))/1000 + 900), "seconds").format("h:mm") }</td>
                }
                {timesheet.clockOut === null && timesheet.employeeId.fulltime === true && 
                <td><b>Waiting for Clock out</b></td> }  
                <td>
                  {/* <form onSubmit={handleSubmit}> */}

                    <div className="input-checkbox">
                      <input
                        type="checkbox"
                        defaultChecked={status}
                        onClick={e => setStatus(!status)}
                      />
                      <span className='formerEmployee'>Approve</span>
                    </div>

                </td>
                <td>
                  <button
                    type="submit"
                    className="btn btn-primary approve-timesheet"
                    style={{width: "75px"}}
                  >Edit </button>
                </td>
              </tr>
            </tbody>
          )
        })}
      </table>
      <button
        type="submit"
        className="btn btn-primary approve-timesheet"
        style={{width: "75px"}}
      >Save </button>
      <Link to={'/timesheet'}>Back</Link>
    </div>
  )
}

export default TimesheetDetailsPage