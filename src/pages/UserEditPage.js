import './UserEditPage.css'
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import rogersLogo from '../assets/images/logo-rogers.png'
import NavbarAdminAll from "../components/NavbarAdminAll";

const UserEditPage = () => {
  const [name, setName] = useState('')
  const [employeeCode, setEmployeeCode] = useState('')
  const [level, setLevel] = useState('')
  const [department, setDepartment] = useState('')
  const [comments, setComments] = useState('')
  const [imageUrl, setImageUrl] = useState('')
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
          name, employeeCode, level, department, comments, imageUrl } = response.data
        setName(name)
        setEmployeeCode(employeeCode)
        setLevel(level)
        setDepartment(department)
        setComments(comments)
        setImageUrl(imageUrl)  
        setLoading(false)
      }).catch(error => console.log(error))
  }, [userId])

  const handleSubmit = e => {
    e.preventDefault()
    const editedUser = { name, employeeCode, level, department, comments, imageUrl }

    axios.put(`${process.env.REACT_APP_API_URL}/user/edit/${userId}`, editedUser)
      .then(response => {
        navigate(`/user/${userId}`)
      }).catch(error => console.log(error))
  }

  if (loading) {
    return <h3>Loading...</h3>
  }

  return (
    <div className="UserEditPage">
      <NavbarAdminAll />
      <img src={rogersLogo} alt="Roger's Logo" className='logo-upd-user'/>
      
      <h1>Edit user details</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="input-group editedUser">
            <input
              type="input"
              className="form input-user-image"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              placeholder="Upload Image"
            />
            <input
              type="text"
              className="form edit-name"
              style={{width: "350px", borderRadius: "5px"}}
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
              style={{width: "350px", borderRadius: "5px"}}
              required
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              value={employeeCode}
              onChange={e => setEmployeeCode(e.target.value)}
              placeholder="Employee Code"
            />
            <input
              type="text"
              className="form edit-level"
              style={{width: "350px", borderRadius: "5px"}}
              required
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              value={level}
              onChange={e => setLevel(e.target.value)}
              placeholder="Level (admin, supervisor, user)"
            />
            <input
              type="text"
              className="form edit-department"
              style={{width: "350px", borderRadius: "5px"}}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              value={department}
              onChange={e => setDepartment(e.target.value)}
              placeholder="Department"
            />
            <input
              type="text"
              className="form edit-password"
              style={{width: "350px", borderRadius: "5px"}}
              disabled
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              placeholder="** Password CANNOT be updated"
            />
            <textarea 
              className="form-control edit-input-comment" 
              style={{width: "350px", borderRadius: "5px"}}
              aria-label="With textarea"
              aria-describedby="inputGroup-sizing-default"
              value={comments}
              onChange={e => setComments(e.target.value)}
              placeholder="Comments: "
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary update-user"
            style={{width: "75px"}}
          >Save</button>
        </form>
      </div>
    </div>
  )
}

export default UserEditPage