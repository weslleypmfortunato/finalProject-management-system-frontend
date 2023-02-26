import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from '../../../contexts/auth.context'
import Swal from 'sweetalert2'

const IsLogged = ({roles, children}) => {
  const { isLoading, loggedInUser } = useContext(AuthContext)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!loggedInUser.user.id) {
    return <Navigate to='/' />
  }

  if (roles && !roles.includes(loggedInUser.user.level)) {
    Swal.fire({
      text: 'Sorry! You do not have permission to access this feature.',
      imageUrl: "https://res.cloudinary.com/weslley-m-fortunato/image/upload/v1677396866/rogers_images/rusn3wxtqqoqojixhdxq.webp",
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
    return <Navigate to='/home' />
  }
  return children
}

export default IsLogged
