import './UserEditPage.css'
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import NavbarAdminAll from '../../../components/1.Components_Employees&Users_Environment/4.Navbar_Admin_All/NavbarAdminAll'
import Swal from 'sweetalert2'

const UserEditPage = () => {
  const [name, setName] = useState('')
  const [employeeCode, setEmployeeCode] = useState('')
  const [level, setLevel] = useState('')
  const [department, setDepartment] = useState('')
  const [comments, setComments] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [dob, setDob] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [position, setPosition] = useState('')
  const [startingDate, setStartingDate] = useState('')
  const [emergencyContact, setEmergencyContact] = useState('')
  const [fulltime, setFullTime] = useState(true)
  const [currentStatus, setCurrentStatus] = useState(false)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const { userId } = useParams()

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  const headers = {
    Authorization: `Bearer ${loggedInUser.jwt}`
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/user/${userId}`, { headers })
      .then(response => {
        const {
          name, employeeCode, level, department, comments, imageUrl, dob, phoneNumber, position, startingDate, emergencyContact, currentStatus, fulltime } = response.data
        setName(name)
        setEmployeeCode(employeeCode)
        setLevel(level)
        setDepartment(department)
        setComments(comments)
        setImageUrl(imageUrl)  
        setDob(dob)
        setPhoneNumber(phoneNumber)
        setPosition(position)
        setStartingDate(startingDate)
        setEmergencyContact(emergencyContact)
        setCurrentStatus(currentStatus)
        setFullTime(fulltime)
        setLoading(false)
      }).catch(error => console.log(error))
  }, [userId])

  const handleSubmit = e => {
    e.preventDefault()
    const editedUser = { name, employeeCode, level, department, comments, imageUrl, dob, phoneNumber, position, startingDate, emergencyContact, currentStatus, fulltime }

    axios.put(`${process.env.REACT_APP_API_URL}/user/edit/${userId}`, editedUser)
      .then(response => {
        navigate(`/user/${userId}`)
      }).catch(error => console.log(error))
  }

  if (loading) {
    return <h3>Loading...</h3>
  }

  const handleUpload = e => {
    const uploadData = new FormData()
    uploadData.append('rogers_images', e.target.files[0])
    axios.post(`${process.env.REACT_APP_API_URL}/user/file-upload`, uploadData, { headers })
      .then(response => {
        setImageUrl(response.data.url)
        Swal.fire({
            text: 'Image uploaded succesfully',
            imageUrl: "https://res.cloudinary.com/weslley-m-fortunato/image/upload/v1677397112/rogers_images/odjljdihn1mx3si6gdes.jpg",
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
      }).catch(error => console.log(error))
    }

  if (loading) {
    return <h3>Loading...</h3>
  }

  return (
    <div className="UserEditPage">
      <NavbarAdminAll />
      <img src="https://res.cloudinary.com/weslley-m-fortunato/image/upload/v1677396073/rogers_images/eaql23eo6n1hnlmfnggy.png" alt="Roger's Logo" className='logo-upd-user' />
      <h1>Edit user details</h1>
      <div>
        <img src={imageUrl} alt="Employee Profile" style={{borderRadius: "5px", width: "100px", display: "grid", marginLeft: "50px"}}/>
        <form onSubmit={handleSubmit}>
          <div className="input-checkbox">
            <input
              type="checkbox"
              defaultChecked={currentStatus}
              onClick={e => setCurrentStatus(!currentStatus)}
            />
            <span className='formerEmployee'>Former employee</span>
          </div>
          <div className="input-group editedUser">
            <input
              type="file"
              className='image-input'
              style={{borderRadius: "5px"}}
              onChange={e => handleUpload(e)}
            />
            <div className="p-user-data">
              <p className='no-img'>If no image is selected the system will upload the previous saved image</p>
              <div className="user-data">
                <div className="edit-name-employeeCode">
                  <input
                    type="text"
                    className="form edit-name"
                    style={{borderRadius: "5px"}}
                    required
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    className="form edit-employee-code"
                    style={{borderRadius: "5px"}}
                    required
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    value={employeeCode}
                    onChange={e => setEmployeeCode(e.target.value)}
                    placeholder="Employee Code"
                  />
                </div>
                <div className="edit-level-department">
                  <select
                    className='form edit-level-user'
                    style={{borderRadius: "5px", height: "32px"}}
                    value={level}
                    onChange={e => setLevel(e.target.value)}
                  >
                    <option value="admin">Administrator</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="user">User</option>
                  </select>
                  <select
                    className='form edit-department-user'
                    style={{borderRadius: "5px", height: "32px"}}
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                  >
                    <option value="generic">Generic</option>
                    <option value="production">Production</option>
                    <option value="molding">Molding</option>
                    <option value="packing">Packing</option>
                    <option value="floorwrap">Floorwrap</option>
                    <option value="warehouse">Warehouse</option>
                  </select>
                </div>
                <div className="edit-dob-phoneNumber">
                  <select
                  className='form department-user'
                  style={{borderRadius: "5px", height: "32px", width: "100px"}}
                  required
                  value={fulltime}
                  onChange={e => setFullTime(e.target.value)}
                >
                  <option value={true}>Full-time</option>
                  <option value={false}>Part-time</option>
                </select>
                  <input
                    type="text"
                    className="form edit-dob"
                    style={{borderRadius: "5px", width: "170px"}}
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    value={dob}
                    onChange={e => setDob(e.target.value)}
                    placeholder="Date of birthday"
                  />
                  <input
                    type="text"
                    className="form edit-phone"
                    style={{borderRadius: "5px", width: "155px"}}
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    placeholder="PhoneNumber"
                  />
                </div>
                <div className="edit-startingDate-emergencyContact">
                  <input
                    type="text"
                    className="form edit-startingDate"
                    style={{borderRadius: "5px"}}
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    value={startingDate}
                    onChange={e => setStartingDate(e.target.value)}
                    placeholder="Starting Date"
                  />
                  <input
                    type="text"
                    className="form edit-emergencyContact"
                    style={{borderRadius: "5px"}}
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    value={emergencyContact}
                    onChange={e => setEmergencyContact(e.target.value)}
                    placeholder="Emergency contact"
                  />
                </div>
                <div className="edit-password-position">
                  <input
                    type="text"
                    className="form edit-password"
                    style={{borderRadius: "5px"}}
                    disabled
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    placeholder="** Password CANNOT be updated"
                  />
                  <input
                    type="text"
                    className="form edit-position"
                    style={{borderRadius: "5px"}}
                    required
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    value={position}
                    onChange={e => setPosition(e.target.value)}
                    placeholder="Position"
                  />
                </div>
                <textarea
                  className="form-control edit-input-comment"
                  style={{width: "450px", borderRadius: "5px", marginLeft: "7px"}}
                  aria-label="With textarea"
                  aria-describedby="inputGroup-sizing-default"
                  value={comments}
                  onChange={e => setComments(e.target.value)}
                  placeholder="Comments: "
                ></textarea>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary update-user"
            style={{width: "75px"}}
          >Save</button>
        </form>
      </div>
      <Link to={`/user/${userId}`} style={{margin: "20px"}}>
        <p>Back</p>
      </Link>
    </div>
  )
}

export default UserEditPage