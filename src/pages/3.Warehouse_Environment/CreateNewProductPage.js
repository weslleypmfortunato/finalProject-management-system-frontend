import './CreateNewProductPage.css'
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import NavbarAdminAll from "../../components/1.Components_Employees&Users_Environment/4.Navbar_Admin_All/NavbarAdminAll";
import Swal from "sweetalert2";

const CreateNewProductPage = () => {
  const [products, setProducts] = useState([])
  const [productCode, setProductCode] = useState('')
  const [productDescription, setProductDescription] = useState('')
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

  const handleSubmit = e => {
    e.preventDefault()
    
    const newProduct = { productCode, productDescription } 

    setProducts([...products, newProduct])
    setProductCode('')
    setProductDescription('')

    axios.post(`${process.env.REACT_APP_API_URL}/products/new`, newProduct, { headers })
      .then(response => {
        if (response.status === 201) {
          setRefresh(!refresh)
          Swal.fire({
            text: 'Product added successfully',
            imageUrl: "https://res.cloudinary.com/weslley-m-fortunato/image/upload/v1677397055/rogers_images/vamtaidwul4evlgjhn6p.jpg",
            imageWidth: 150,
            imageHeight: 150,
            imageAlt: 'Custom image',
          })
        }
      }).catch (error => {
        messageError(error.response.data.message)
      })
  }

  return (
    <div className="CreateNewProductPage">
      <NavbarAdminAll />
      <img src="https://res.cloudinary.com/weslley-m-fortunato/image/upload/v1677396073/rogers_images/eaql23eo6n1hnlmfnggy.png" alt="Roger's Logo" className='logo-create-new-user' />
      <h1 className='add-newProduct'>Add new Product</h1>
      <div className="newProduct-form">
        <form onSubmit={handleSubmit}>
          <div className="productCode-productDescription">
            <input
              type="text"
              className="form newProductCode-input"
              style={{borderRadius: "5px", height: "35px", width: "400px"}}
              required
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              value={productCode}
              onChange={e => setProductCode(e.target.value)}
              placeholder="Product Code"
            />
            <input
              type="text"
              className="form newProductDescription-input"
              style={{borderRadius: "5px", height: "35px", width: "400px"}}
              required
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              value={productDescription}
              onChange={e => setProductDescription(e.target.value)}
              placeholder="Product Description"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary add-product-btn"
            style={{width: "75px"}}
          >Add</button>
        </form>
      </div>
      <Link to={'/products'} style={{margin: "20px"}}>
        <p>Back</p>
      </Link>
    </div>
  )
}

export default CreateNewProductPage