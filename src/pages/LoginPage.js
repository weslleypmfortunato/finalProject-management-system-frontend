import './LoginPage.css'
import Login from '../components/Login'

const LoginPage = () => {
  return (
    <div className="LoginPage">
      <h1 className='welcome'>Welcome to Rogers' Chocolates Environment Control</h1>
      <img className='rogers-logo' src="https://res.cloudinary.com/weslley-m-fortunato/image/upload/v1677396073/rogers_images/eaql23eo6n1hnlmfnggy.png" alt="Rogers Logo" />
      <Login />
      <h5 className='dont-have-account'>Don't have an account? Ask your immediate superior to create one.</h5>
    </div>
  )
}

export default LoginPage