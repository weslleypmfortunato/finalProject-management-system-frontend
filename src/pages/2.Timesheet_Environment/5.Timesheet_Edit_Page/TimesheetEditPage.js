import './TimesheetEditPage.css'
import axios from "axios";
import { React, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NavbarAdminAll from "../../../components/1.Components_Employees&Users_Environment/4.Navbar_Admin_All/NavbarAdminAll";
import Swal from 'sweetalert2'

const TimesheetEditPage = ({timesheet}) => {
  const [timesheets, setTimesheets] = useState([])
  const [clockIn, setClockIn] = useState('')
  const [clockOut, setClockOut] = useState('')
  const [loading, setLoading] = useState(true)

  const { timesheetEmployeeId } = useParams()

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
    axios.get(`${process.env.REACT_APP_API_URL}/timesheet/employee/${timesheetEmployeeId}`, { headers })
      .then(response => {
        const { clockIn, clockOut } = response.data
        setClockIn(new Date (clockIn))
        setClockOut(new Date (clockOut))
        setLoading(false)
      }).catch (error => {
        messageError(error.response.data.message)
      })
  }, [timesheetEmployeeId])

  const handleSubmit = e => {
    e.preventDefault()
    const editEmployeeTimesheet = { clockIn, clockOut }

    axios.put(`${process.env.REACT_APP_API_URL}/timesheet/edit/${timesheetEmployeeId}`, editEmployeeTimesheet)
      .then(response => {
        window.close()
      }).catch (error => {
        messageError(error.response.data.message)
      })
  }

  if (loading) {
    return <h3>Loading...</h3>
  }

  return (
    <div className="TimesheetEditPage">
      <NavbarAdminAll />
      <img src="https://res.cloudinary.com/weslley-m-fortunato/image/upload/v1677396073/rogers_images/eaql23eo6n1hnlmfnggy.png" alt="Roger's Logo" className='logo-upd-user' />
      <h1 className='editTimesheetH1'>Edit timesheet details</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3" >
          <span className="input-group-text" id="basic-addon1" style={{marginRight: "8px", borderRadius: "5px", width: "100px"}}>ClockIn</span>
          <input
            type="text"
            className="form edit-clockIn"
            style={{borderRadius: "5px", width: "400px"}}
            required
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            value={clockIn}
            onChange={e => setClockIn(e.target.value)}
            placeholder="Clock in"
          />
        </div>

        <div className="input-group mb-3" >
          <span className="input-group-text" id="basic-addon1" style={{marginRight: "8px", borderRadius: "5px", width: "100px"}}>ClockOut</span>
          <input
            type="text"
            className="form edit-clockOut"
            style={{borderRadius: "5px", width: "400px"}}
            required
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            value={clockOut}
            onChange={e => setClockOut(e.target.value)}
            placeholder="Clock out"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary update-user"
          style={{width: "75px"}}
        >Save</button>
      </form>      
    </div>
  )
}

export default TimesheetEditPage