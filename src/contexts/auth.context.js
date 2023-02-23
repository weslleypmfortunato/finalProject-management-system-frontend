import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

const AuthProvider = (props) => {
  const [loggedInUser, setLoggedInUser] = useState({name: '', user:{}})
  // const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  // const storedInUser = localStorage.getItem('loggedInUser')
  // const parsedInUser = JSON.parse(storedInUser) || {}

  const logout = () => {
    localStorage.removeItem('loggedInUser')
    setLoggedInUser({name: '', user: {}})
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{logout}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }