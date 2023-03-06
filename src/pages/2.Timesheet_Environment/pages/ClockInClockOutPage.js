import './ClockInClockOutPage.css'
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ClockInClockOutPage = () => {
  const [timesheets, setTimesheets] = useState([])
  const [employeeCode, setEmployeeCode] = useState('')
  const [password, setPassword] = useState('')
  const [clockIn, setClockIn] = useState('')
  const [clockOut, setClockOut] = useState('')
  const [refresh, setRefresh] = useState(true)


  const handleSubmit = e => {
    e.preventDefault()

    axios.post(`${process.env.REACT_APP_API_URL}/timesheet`)
    .then(response => {
      if (response.status === 201) {
        setRefresh(!refresh)
        Swal.fire({
          text: 'Clock In/Out created successfully',
          imageUrl: "https://res.cloudinary.com/weslley-m-fortunato/image/upload/v1677397055/rogers_images/vamtaidwul4evlgjhn6p.jpg",
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Custom image',
        })
      }
    }).catch(error => console.log(error))
  }

  return (
    <div className="ClockInClockOutPage">
      <img src="https://res.cloudinary.com/weslley-m-fortunato/image/upload/v1677396073/rogers_images/eaql23eo6n1hnlmfnggy.png" alt="Roger's Logo" className='logo-create-new-user' />
      <h1 className='clockInOut-header'>Clock In / Out Page</h1>
      <div className="timesheet-input">
        <form onSubmit={handleSubmit}>
          <div className="timesheet-employeeCode-password-input">
            <ul className="list-group">
              <div className="radios">
                <li className="list-group-item single-radio">
                  <input
                    className="form-check-input me-1 radio-clockin"
                    style={{borderRadius: "5px", border: "1px solid lightgray"}}
                    type="radio"
                    name="listGroupRadio"
                    value={employeeCode}
                    onChange={e => setEmployeeCode(e.target.value)}
                    id="firstRadio"
                    checked
                  />
                  <label className="" for="firstRadio">Clock In</label>
                </li>
                <li className="list-group-item">
                  <input
                    className="form-check-input me-1 radio-clockout"
                    style={{borderRadius: "5px", border: "1px solid lightgray"}}
                    type="radio"
                    name="listGroupRadio"
                    value={employeeCode}
                    onChange={e => setEmployeeCode(e.target.value)}
                    id="secondRadio"
                  />
                  <label className="form-check-label" for="secondRadio">Clock Out</label>
                </li>
              </div>
            </ul>
            <input
              type="text"
              className="form timesheet-employeeCode-input"
              required
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              value={employeeCode}
              onChange={e => setEmployeeCode(e.target.value)}
              placeholder="Employee Code"
            />
            <input
              type="password"
              className="form timesheet-password-input"
              required
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary add-clockInOut"
            style={{width: "75px"}}
          >Add</button>
        </form>

      </div>
    </div>
  )
}

export default ClockInClockOutPage
