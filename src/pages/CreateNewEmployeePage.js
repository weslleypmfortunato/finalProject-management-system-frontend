import './CreateNewEmployeePage.css'
import axios from 'axios'
import { useState } from 'react'
import rogersLogo from '../assets/images/logo-rogers.png'
import NavbarAdminAll from '../components/NavbarAdminAll'
import Swal from 'sweetalert2'

const CreateNewEmployeePage = () => {
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [employeeCode, setEmployeeCode] = useState('')
  const [dob, setDob] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [level, setLevel] = useState('')
  const [startingDate, setStartingDate] = useState('')
  const [department, setDepartment] = useState('')
  const [position, setPosition] = useState('')
  const [password, setPassword] = useState('')
  const [emergencyContact, setEmergencyContact] = useState('')
  const [currentStatus, setCurrentStatus] = useState(false)
  const [comments, setComments] = useState('')
  const [imageUrl, setImageUrl] = useState(null)
  const [refresh, setRefresh] = useState(true)

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  const headers = {
    Authorization: `Bearer ${loggedInUser.jwt}`
  }

  const handleSubmit = e => {
    e.preventDefault()

    const newEmployee = {
      name, employeeCode, dob, phoneNumber, level, startingDate, department, position, password, emergencyContact, currentStatus, comments 
    }

    if (imageUrl) {
      newEmployee.imageUrl = imageUrl
    }

    setUsers([...users, newEmployee])
    setName('')
    setEmployeeCode('')
    setDob('')
    setPhoneNumber('')
    setLevel('')
    setStartingDate('')
    setDepartment('')
    setPosition('')
    setPassword('')
    setEmergencyContact('')
    setCurrentStatus('')
    setComments('')
    setImageUrl('')

    axios.post(`${process.env.REACT_APP_API_URL}/sign-up/employee`, newEmployee, { headers })
      .then(response => {
        if (response.status === 201) {
          setRefresh(!refresh)
          Swal.fire({
            text: 'Employee created successfully',
            imageUrl: "https://knowledgepoint.com/wp-content/uploads/2018/05/iStock-845888110.jpg",
            imageWidth: 300,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
        }
      }).catch(error => console.log(error))
  }

  return (
    <div className="CreateNewUserPage">
      <NavbarAdminAll />
      <img src={rogersLogo} alt="Roger's Logo" className='logo-create-new-user'/>
      <h1>Create New Employee</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="input-group newUser">
            <div className="imageUrl">
              <input
                type="input"
                className="form input-image"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                placeholder="Upload Image"
              />
            </div>
            <div className="name-employeeCode">
              <input
                type="text"
                className="form name"
                required
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Name"
              />
              <input
                type="text"
                className="form employee-code"
                required
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                value={employeeCode}
                onChange={e => setEmployeeCode(e.target.value)}
                placeholder="Employee Code"
              />
            </div>
            <div className="dob-phoneNumber">
              <input
                type="text"
                className="form dob"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                value={dob}
                onChange={e => setDob(e.target.value)}
                placeholder="Birthday YYYY-MM-DD"
              />
              <input
                type="text"
                className="form phone"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                placeholder="PhoneNumber"
              />
            </div>
            <div className="level-startingDate">
              <select
                className='form level'
                value={level}
                onChange={e => setLevel(e.target.value)}
              >
                <option value="user">Choose an user level</option>
                <option value="admin">Administrator</option>
                <option value="supervisor">Supervisor</option>
                <option value="user">User</option>
              </select>
              <input
                type="text"
                className="form startingDate"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                value={startingDate}
                onChange={e => setStartingDate(e.target.value)}
                placeholder="Starting Date YYYY-MM-DD"
              />
            </div>
            <div className="department-position">
              <select
                className='form department level'
                value={department}
                onChange={e => setDepartment(e.target.value)}
              >
                <option value="generic">Choose a department</option>
                <option value="production">Production</option>
                <option value="molding">Molding</option>
                <option value="packing">Packing</option>
                <option value="floorwrap">Floorwrap</option>
                <option value="warehouse">Warehouse</option>
              </select>
              <input
                type="text"
                className="form position"
                required
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                value={position}
                onChange={e => setPosition(e.target.value)}
                placeholder="Position"
              />
            </div>
            <div className="password-emergencyContact">
              <input
                type="text"
                className="form password"
                required
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
              />
              <input
                type="text"
                className="form emergencyContact"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                value={emergencyContact}
                onChange={e => setEmergencyContact(e.target.value)}
                placeholder="Emergency contact"
              />
            </div>
            <div className="comments input-group">
              <textarea 
                className="form-control input-comment" 
                style={{width: "430px"}}
                aria-label="With textarea"
                aria-describedby="inputGroup-sizing-default"
                value={comments}
                onChange={e => setComments(e.target.value)}
                placeholder="Comments: "
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary add-user"
            style={{width: "75px"}}
          >Add</button>
        </form>
      </div>
    </div>
  )
}

export default CreateNewEmployeePage