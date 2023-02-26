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

  const handleUpload = e => {
    const uploadData = new FormData()
    uploadData.append('rogers_images', e.target.files[0])
    axios.post(`${process.env.REACT_APP_API_URL}/employee/file-upload`, uploadData, { headers }) // se der falha remove o headers que não tinha na aula
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
        <form onSubmit={handleSubmit}>
          <div className="input-group editedUser">
            <input
              type="file"
              className='image-input'
              style={{borderRadius: "5px"}}
              onChange={e => handleUpload(e)}
            />
            <p className='no-img'>If no image is selected the system will upload the previous saved image</p>
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
            <select
              className='form level-user'
              style={{borderRadius: "5px", height: "32px"}}
              value={level}
              onChange={e => setLevel(e.target.value)}
            >
              <option value="user">Choose an user level</option>
              <option value="admin">Administrator</option>
              <option value="supervisor">Supervisor</option>
              <option value="user">User</option>
            </select>
            <select
              className='form department-user'
              style={{borderRadius: "5px", height: "32px"}}
              value={department}
              onChange={e => setDepartment(e.target.value)}
            >
              <option value="">Choose a department</option>
              <option value="generic">Generic</option>
              <option value="production">Production</option>
              <option value="molding">Molding</option>
              <option value="packing">Packing</option>
              <option value="floorwrap">Floorwrap</option>
              <option value="warehouse">Warehouse</option>
            </select>
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
      <Link to={`/user/${userId}`} style={{margin: "20px"}}>
        <p>Back</p>
      </Link>
    </div>
  )
}

export default UserEditPage