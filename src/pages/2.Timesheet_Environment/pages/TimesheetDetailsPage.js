import './MyTimesheetPage.css'
import NavbarAdminAll from '../../../components/1.Components_Employees&Users_Environment/4.Navbar_Admin_All/NavbarAdminAll';
import axios from "axios";
import { useEffect, useState } from "react";
import moment from 'moment-timezone'
import Swal from 'sweetalert2'
import { useParams, Link } from 'react-router-dom';
require('moment-precise-range-plugin')

const TimesheetDetailsPage = () => {

  const dayBefore = new Date(Date.now() - ( 3600 * 1000 * 24))

  const [timesheets, setTimesheets] = useState([])
  const [status, setStatus] = useState(false)
  const [refresh] = useState(true)
  const [startDate, setStartDate] = useState(dayBefore.toJSON().slice(0,10).replace('/','-'))
  const [endDate, setEndDate] = useState(new Date().toJSON().slice(0,10).replace('/','-'))

  const moment = require("moment");
  const momentDurationFormatSetup = require("moment-duration-format");

  const { id } = useParams()

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
    axios.get(`${process.env.REACT_APP_API_URL}/timesheet/${id}?startDate=${startDate}&endDate=${endDate}`, { headers })
    .then(response => {
      setTimesheets(response.data)
      const { status } = response.data
      setStatus(status)
    }).catch(error => console.log(error))
  }, [ refresh ])

  const handleSubmit = e => {
    e.preventDefault()
    const approvedTimesheet = { status}

    axios.put(`${process.env.REACT_APP_API_URL}/user/edit/${id}`, approvedTimesheet)
      .then(response => {
      }).catch(error => {
        messageError('System error')
      })
    }

    const massApproval = () => {
      const approvedTimesheets = timesheets.filter((timesheet) => {
        return timesheet.status === false
      }).map(approvedTimesheet => {
        console.log("APPROVEDTIMESHEET",approvedTimesheet)
        return approvedTimesheet._id
      })
      console.log("APPROVEDTIMESHEETS",approvedTimesheets)

      axios.put(`${process.env.REACT_APP_API_URL}/timesheet/approval`, {ids: approvedTimesheets})
      .then(response => {
        Swal.fire({
          text: "Timesshets approved",
          imageUrl: "https://res.cloudinary.com/weslley-m-fortunato/image/upload/v1677396949/rogers_images/lfn5fdhvz3tcezcagj1s.png",
          imageWidth: 100,
          imageHeight: 100,
          imageAlt: 'Custom image',
        })
      }).catch(error => console.log(error))
    }

  return (
    <div className="TimesheetByPerson">
      <NavbarAdminAll />
      <div className="image-h1-myTimesheet">
        <h1 className='h1-my-timesheet'>Timesheet Validation Page</h1>
      </div>
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
        <div className="btns-search-save">
          <button
            type="submit"
            className="btn btn-primary search-timesheet"
            style={{width: "75px"}}
            onClick={handleSubmit}
          >Search
          </button>
          <button
          type="submit"
          className="btn btn-warning approve-timesheet"
          style={{width: "75px"}}
          onClick={massApproval}
                >Save </button>
        </div>
      </form>

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
        {timesheets.length > 0 &&  timesheets.map(timesheet => {
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
                    <div className="input-checkbox">
                      <input
                        type="checkbox"
                        disabled={timesheet.status === false ? false : true}
                        defaultChecked={status}
                        onClick={e => setStatus(!status)}
                      />
                      <span id={timesheet.status === false ? "display-approved" : "hide-approve"} className='formerEmployee'>{timesheet.status === false ? "Approve" : "Approved "}</span>
                    </div>
                </td>
                <td>
                  <button
                    type="submit"
                    disabled={timesheet.status === false ? false : true}
                    className={timesheet.status === true ? "btn btn-outline-primary approve-timesheet" : "btn btn-primary approve-timesheet"}
                    id={timesheet.status === false ? "display-edit" : "hide-edit-btn"}
                    style={{width: "75px"}}
                  >Edit </button>
                </td>
              </tr>
            </tbody>
          )
        })}
      </table>
      <Link to={'/timesheet'}>Back</Link>
    </div>
    
  )
  
}

export default TimesheetDetailsPage