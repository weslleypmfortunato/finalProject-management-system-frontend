import './ClockInClockOutPage.css'
import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ClockInClockOutPage = () => {
  const [employeeCode, setEmployeeCode] = useState('')
  const [password, setPassword] = useState('')
  const [refresh, setRefresh] = useState(true)
  const [setLoggedOutUser] = useState({name: '', user:{}})
  const [ showPassword, setShowPassword ] = useState(false)

  const navigate = useNavigate()

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  }

  const logOut = () => {
    localStorage.removeItem('loggedInUser')
    setLoggedOutUser({name: '', user: {}})
    navigate('/timesheet/clockin-clockout')
  }

  const handleSubmit = e => {
    e.preventDefault()

    axios.post(`${process.env.REACT_APP_API_URL}/timesheet/clockin-clockout`, {employeeCode, password})
    .then(response => {
      if (response.status === 201) {
        setRefresh(!refresh)
        Swal.fire({
          text: 'Clock In registered successfully',
          imageUrl: "https://res.cloudinary.com/weslley-m-fortunato/image/upload/v1677397055/rogers_images/vamtaidwul4evlgjhn6p.jpg",
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Custom image',
        })
      }
      if (response.status === 200) {
        setRefresh(!refresh)
        Swal.fire({
          text: 'Clock Out registered successfully',
          imageUrl: "https://res.cloudinary.com/weslley-m-fortunato/image/upload/v1677397055/rogers_images/vamtaidwul4evlgjhn6p.jpg",
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Custom image',
        })
      }
      setEmployeeCode('')
      setPassword('')
    }).catch(error => console.log(error))
  }

  return (
    <div className="ClockInClockOutPage">
      <img src="https://res.cloudinary.com/weslley-m-fortunato/image/upload/v1677396073/rogers_images/eaql23eo6n1hnlmfnggy.png" alt="Roger's Logo" className='logo-clockInOut' />
      <h1 className='clockInOut-header'>Clock In / Out Page</h1>
      <div className="timesheet-input">
        <form onSubmit={handleSubmit}>
          <div className="timesheet-employeeCode-password-input">
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
            <div className="clockIn-password">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form timesheet-password-input"
                style={{marginLeft: "20px"}}
                required
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <FontAwesomeIcon
              style={{marginLeft: "4px" , marginTop: "8px"}}
              icon={showPassword ? faEyeSlash : faEye}
              onClick={handleTogglePassword}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary add-clockInOut"
            style={{width: "75px"}}
          >Add</button>
        </form>
        <Link onClick={() => logOut(logOut.jwt)} to={'/'} >Click here to login and check your Timesheet</Link>

      </div>
    </div>
  )
}

export default ClockInClockOutPage
