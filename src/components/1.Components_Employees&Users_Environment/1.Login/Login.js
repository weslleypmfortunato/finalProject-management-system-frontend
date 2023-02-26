import './Login.css'
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../../contexts/auth.context'

const Login = () => {
  const [ employeeCode, setEmployeeCode ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ showPassword, setShowPassword ] = useState(false)

  const navigate = useNavigate()
  const { setLoggedInUser } = useContext(AuthContext)

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  }

  const handleSubmit = e => {
    e.preventDefault()

    const userLogin = {
      employeeCode,
      password
    }

    axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, userLogin)
      .then(response => {
        localStorage.setItem("loggedInUser", JSON.stringify(response.data))
        setLoggedInUser(response.data)
        setEmployeeCode('')
        setPassword('')
        navigate('/home')
      }).catch(error => console.log(error))
  }

  return (
    <div className="Login">
      <h2>Login</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <div className="input-group employeeCode">
          <input 
            type="text"
            className="form login-input"
            required
            aria-label="Sizing example input" 
            aria-describedby="inputGroup-sizing-default"
            placeholder="Employee Code"
            value={employeeCode}
            onChange={e => setEmployeeCode(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input 
            type={showPassword ? 'text' : 'password'}
            className="form login-input-password"
            required
            aria-label="Sizing example input" 
            aria-describedby="inputGroup-sizing-default"
            placeholder="Password"
            style={{borderRadius: "5px"}}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <FontAwesomeIcon
            style={{marginLeft: "4px" , marginTop: "8px"}}
            icon={showPassword ? faEyeSlash : faEye}
            onClick={handleTogglePassword}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary login-btn"
          style={{width: "75px", margin: "auto", marginTop: "20px", marginBottom: "20px"}}
        >Login</button>
      </form>
    </div>
  )
}

export default Login