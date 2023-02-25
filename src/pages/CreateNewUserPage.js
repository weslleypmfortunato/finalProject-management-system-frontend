import './CreateNewUserPage.css'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import rogersLogo from '../assets/images/logo-rogers.png'
import NavbarAdminAll from '../components/NavbarAdminAll'
import Swal from 'sweetalert2'

const CreateNewUserPage = () => {
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [employeeCode, setEmployeeCode] = useState('')
  const [level, setLevel] = useState('')
  const [department, setDepartment] = useState('')
  const [password, setPassword] = useState('')
  const [comments, setComments] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [refresh, setRefresh] = useState(true)

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  const headers = {
    Authorization: `Bearer ${loggedInUser.jwt}`
  }

  const handleSubmit = e => {
    e.preventDefault()

    const newUser = {
      name, employeeCode, level, department, password, comments 
    }

    if (imageUrl) {
      newUser.imageUrl = imageUrl
    }

    setUsers([...users, newUser])
    setName('')
    setEmployeeCode('')
    setLevel('')
    setDepartment('')
    setPassword('')
    setComments('')
    setImageUrl('')

    axios.post(`${process.env.REACT_APP_API_URL}/auth/sign-up/user`, newUser, { headers })
      .then(response => {
        if (response.status === 201) {
          setRefresh(!refresh)
          Swal.fire({
            text: 'User created successfully',
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
      <h1>Create New User</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="input-group newUser">
            <input
              type="input"
              className="form input-image-user"
              style={{borderRadius: "5px"}}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              placeholder="Upload Image"
            />
            <input
              type="text"
              className="form name-user"
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
              className="form employee-code-user"
              style={{borderRadius: "5px"}}
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
                <option value="generic">Choose a department</option>
                <option value="production">Production</option>
                <option value="molding">Molding</option>
                <option value="packing">Packing</option>
                <option value="floorwrap">Floorwrap</option>
                <option value="warehouse">Warehouse</option>
              </select>
            <input
              type="text"
              className="form password-user"
              style={{borderRadius: "5px"}}
              required
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
            />
            <textarea 
              className="form-control input-comment-user" 
              style={{width: "430px", borderRadius: "5px"}}
              aria-label="With textarea"
              aria-describedby="inputGroup-sizing-default"
              value={comments}
              onChange={e => setComments(e.target.value)}
              placeholder="Comments: "
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary add-user"
            style={{width: "75px"}}
          >Add</button>
        </form>
      </div>
      <Link to={'/Users'} style={{margin: "20px"}}>
        <p>Back</p>
      </Link>
    </div>
  )
}

export default CreateNewUserPage