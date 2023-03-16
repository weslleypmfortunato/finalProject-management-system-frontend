import './MyTimesheetPage.css'
import NavbarAdminHomePage from '../../../components/1.Components_Employees&Users_Environment/3.Navbar_Admin_Homepage/NavbarAdminHomePage';
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
require('moment-precise-range-plugin')

const TimesheetByPerson = () => {
  const [timesheets, setTimesheets] = useState([])
  const [userName, setUserName] = useState('')
  const [setLoggedOutUser] = useState({name: '', user:{}})
  const [refresh] = useState(true)

  const navigate = useNavigate()
  const moment = require("moment");
  const momentDurationFormatSetup = require("moment-duration-format");

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  const headers = {
  Authorization: `Bearer ${loggedInUser.jwt}`
  }

  const logOut = () => {
    localStorage.removeItem('loggedInUser')
    setLoggedOutUser({name: '', user: {}})
    navigate('/timesheet/clockin-clockout')
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
    axios.get(`${process.env.REACT_APP_API_URL}/my-timesheet`, { headers })
    .then(response => {
      setTimesheets(response.data)
      setUserName(loggedInUser.user.name)
    }).catch (error => {
      messageError(error.response.data.message)
    })
  }, [ refresh ])

  return (
    <div className="TimesheetByPerson">
      <NavbarAdminHomePage />
      <div className="image-h1-myTimesheet">
        <img src={ loggedInUser.user.imageUrl } alt="User" style={{width: "60px", height: "60px", borderRadius: "50%"}}/>
        <h1 className='h1-my-timesheet'>Hi { userName.split(' ')[0] }! This is your timesheet</h1>
      </div>

      <table className="table table-hover table-sm">
        <thead>
          <tr>
            <th scope="col">Employee Code</th>
            <th scope="col">Date</th>
            <th scope="col">Clock In</th>
            <th scope="col">Clock Out</th>
            <th scope="col">Worked Hours</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        {timesheets.length > 0 && timesheets.map(timesheet => {
          return (
            <tbody key={timesheet._id}>
              <tr>
                <th scope="row">{timesheet.employeeId.employeeCode}</th>
                <td>{new Date(timesheet.clockIn).toLocaleString().split(',')[0]}</td>

                <td>{new Date(timesheet.clockIn).toLocaleString().split(',')[1]}</td>
                {timesheet.clockOut !== null ?  
                <td>{new Date(timesheet.clockOut).toLocaleString().split(',')[1]}</td> : <td>Waiting clockout</td>
                }

                {timesheet.clockOut !== null ?
                  timesheet.employeeId.fulltime === true ? 
                    <td>{ moment.duration(((moment(timesheet.clockOut).diff(timesheet.clockIn))/1000 - 1800), "seconds").format("h:mm") }</td> :
                    <td>{ moment.duration(((moment(timesheet.clockOut).diff(timesheet.clockIn))/1000 + 900), "seconds").format("h:mm") }</td>
                   : <td>Waiting clockout</td>
                }

                {timesheet.status === false ? 
                <td id={timesheet.status === false && 'under-validation'} >Under validation</td> : 
                <td id={timesheet.status === true && 'validated'} >Approved</td>
                }
              </tr>
            </tbody> 
          )
        })}
      </table>
      <h5 className='questions-concerns'>If you have any questions or concerns, talk with your immediate superior.</h5>
      <Link to={'/home'} >Back</Link>
    </div>
  )
}

export default TimesheetByPerson