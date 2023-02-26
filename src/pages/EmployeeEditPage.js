import './EmployeeEditPage.css'
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import rogersLogo from '../assets/images/logo-rogers.png'
import NavbarAdminAll from "../components/NavbarAdminAll";
import Swal from 'sweetalert2'

const EmployeeEditPage = () => {
  const [name, setName] = useState('')
  const [employeeCode, setEmployeeCode] = useState('')
  const [dob, setDob] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [level, setLevel] = useState('')
  const [startingDate, setStartingDate] = useState('')
  const [department, setDepartment] = useState('')
  const [position, setPosition] = useState('')
  const [emergencyContact, setEmergencyContact] = useState('')
  const [currentStatus, setCurrentStatus] = useState(true)
  const [comments, setComments] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const { employeeId } = useParams()

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  const headers = {
    Authorization: `Bearer ${loggedInUser.jwt}`
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/employee/${employeeId}`, { headers })
      .then(response => {
        const {
          name, employeeCode, dob, phoneNumber, level, startingDate, department, position, emergencyContact, currentStatus, comments, imageUrl } = response.data
        setName(name)
        setEmployeeCode(employeeCode)
        setDob(dob)
        setPhoneNumber(phoneNumber)
        setLevel(level)
        setStartingDate(startingDate)
        setDepartment(department)
        setPosition(position)
        setEmergencyContact(emergencyContact)
        setCurrentStatus(currentStatus)
        setComments(comments)
        setImageUrl(imageUrl)  
        setLoading(false)
      }).catch(error => console.log(error))
  }, [employeeId])

  const handleSubmit = e => {
    e.preventDefault()
    const editedEmployee = { name, employeeCode, dob, phoneNumber, level, startingDate, department, position, emergencyContact, currentStatus, comments, imageUrl }

    axios.put(`${process.env.REACT_APP_API_URL}/employee/edit/${employeeId}`, editedEmployee)
      .then(response => {
        navigate(`/employee/${employeeId}`)
      }).catch(error => console.log(error))
  }

  if (loading) {
    return <h3>Loading...</h3>
  }

  const handleUpload = e => {
    const uploadData = new FormData()
    uploadData.append('rogers_images', e.target.files[0])
    axios.post(`${process.env.REACT_APP_API_URL}/employee/file-upload`, uploadData, { headers }) // se der falha remove o headers que não tinha na aula
      .then(response => {
        setImageUrl(response.data.url)
        Swal.fire({
            text: 'Image uploaded succesfully',
            imageUrl: "https://media.istockphoto.com/id/1175303918/vector/like-icon-vector-design.jpg?s=612x612&w=0&k=20&c=3dFZEggnAyodAcj9sSnnUvSZ69LQbE9kZof7vgGvAgs=",
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
      }).catch(error => console.log(error))
    }

  return (
    <div className="EmployeeEditPage">
      <NavbarAdminAll />
      <img src={rogersLogo} alt="Roger's Logo" className='logo-create-new-user'/>
      
      <h1>Edit Employee's Details</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="input-group editedEmployee">
            <div className="editedImageUrl">
              <div className="input-checkbox">
                <input
                  type="checkbox"
                  checked={currentStatus}
                  onClick={e => setCurrentStatus(!currentStatus)}
                />
                <span className='formerEmployee'>Former employee</span>
              </div>
              <input
                type="file"
                className='image-input'
                style={{borderRadius: "5px"}}
                onChange={e => handleUpload(e)}
              />
              <p className='no-img'>If no image is selected the system will upload the previous saved image</p>
            </div>
            <div className="name-employeeCode">
              <input
                type="text"
                className="form name"
                style={{width: "350px"}}
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
                style={{width: "350px"}}
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
                style={{width: "350px"}}
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                value={dob}
                onChange={e => setDob(e.target.value)}
                placeholder="Date of birthday"
              />
              <input
                type="text"
                className="form phone"
                style={{width: "350px"}}
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                placeholder="PhoneNumber"
              />
            </div>
            <div className="level-startingDate">
            <select
                className='form level edit-employee'
                style={{width: "350px"}}
                value={level}
                onChange={e => setLevel(e.target.value)}
              >
                <option value="user">User</option>
              </select>
              <input
                type="text"
                className="form startingDate"
                style={{width: "350px"}}
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                value={startingDate}
                onChange={e => setStartingDate(e.target.value)}
                placeholder="Starting Date"
              />
            </div>
            <div className="department-position">
              <select
                className='form department level'
                style={{width: "350px"}}
                value={department}
                onChange={e => setDepartment(e.target.value)}
              >
                <option value="generic">Choose a department</option>
                <option value="production">Production</option>
                <option value="molding">Molding</option>
                <option value="packing">Packing</option>
                <option value="flowwrap">Flowwrap</option>
                <option value="warehouse">Warehouse</option>
              </select>
              <input
                type="text"
                className="form position"
                style={{width: "350px"}}
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
                style={{width: "350px"}}
                disabled
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                placeholder="** Password CANNOT be updated"
              />
              <input
                type="text"
                className="form emergencyContact"
                style={{width: "350px"}}
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
          >Save</button>
        </form>
      </div>
      <Link to={`/employee/${employeeId}`} style={{margin: "20px"}}>
        <p>Back</p>
      </Link>
    </div>
  )
}

export default EmployeeEditPage