import './AddMissingProducts.css'
import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const AddMissingProducts = () => {
  const [missingProducts, setMissingProducts] = useState([])
  const [productCode, setProductCode] = useState('')
  const [quantities, setQuantities] = useState('')
  const [refresh, setRefresh] = useState(true)

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  const headers = {
    Authorization: `Bearer ${loggedInUser.jwt}`
  }

  const messageError = (text) => {
    Swal.fire({
    text,
    imageUrl: "https://res.cloudinary.com/weslley-m-fortunato/image/upload/v1677396949/rogers_images/lfn5fdhvz3tcezcagj1s.png",
    imageWidth: 100,
    imageHeight: 100,
    imageAlt: 'Custom image',
  })
}
  const handleSubmitPost = e => {
    e.preventDefault()

    const addMissingProduct = { productCode, quantities }

    setMissingProducts([...missingProducts, addMissingProduct])
    setProductCode('')
    setQuantities('')
    window.location.reload()
    
    axios.post(`${process.env.REACT_APP_API_URL}/missing-products`, addMissingProduct, { headers })
      .then(response => {
        if (response.status === 201) {
          setRefresh(!refresh)
        }
      }).catch (error => {
        messageError(error.response.data.message)
      })
  }

  return (
    <div className="addNewItem">
        <form onSubmit={handleSubmitPost}>
          <div className="input-addNewItem-">
            <input
              type="text"
              className="form productCode-input"
              required
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              value={productCode}
              onChange={e => setProductCode(e.target.value)}
              placeholder="Product Code"
            />
            <input
              type="text"
              className="form productQuantity-input"
              style={{marginLeft: "20px"}}
              required
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              placeholder="Quantity"
              value={quantities}
              onChange={e => setQuantities(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary add-clockInOut"
            style={{width: "75px"}}
          >Add</button>
        </form>
      </div>
  )
}

export default AddMissingProducts