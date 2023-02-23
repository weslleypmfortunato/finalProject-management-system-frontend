import './LoginPage.css'
import rogersLogo from '../assets/images/logo-rogers.png'
import Login from '../components/Login'

const LoginPage = () => {
  return (
    <div className="LoginPage">
      <h1 className='welcome'>Welcome to Rogers' Chocolates Environment Control</h1>
      <img className='rogers-logo' src={ rogersLogo } alt="Rogers Logo" />
      <Login />
      <h5 className='dont-have-account'>Don't have an account? Ask your immediate superior to create one.</h5>
    </div>
  )
}

export default LoginPage