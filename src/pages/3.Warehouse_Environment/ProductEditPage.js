import './ProductEditPage.css'
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import NavbarAdminAll from "../../components/1.Components_Employees&Users_Environment/4.Navbar_Admin_All/NavbarAdminAll";

const ProductEditPage = () => {
  const [productCode, setProductCode] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const { productId } = useParams()

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  const headers = {
    Authorization: `Bearer ${loggedInUser.jwt}`
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/product/${productId}`, { headers })
      .then(response => {
        const { productCode, productDescription } = response.data
        setProductCode(productCode)
        setProductDescription(productDescription)
        setLoading(false)
      }).catch(error => console.log(error))
  }, [productId])

  const handleSubmit = e => {
    e.preventDefault()
    const editProduct = { productCode, productDescription }

    axios.put(`${process.env.REACT_APP_API_URL}/product/edit/${productId}`, editProduct)
      .then(response => {
        navigate('/products')
      }).catch(error => console.log(error))
  }

  if (loading) {
    return <h3>Loading...</h3>
  }

  return ( 
    <div className="ProductEditPage">
      <NavbarAdminAll />
      <img src="https://res.cloudinary.com/weslley-m-fortunato/image/upload/v1677396073/rogers_images/eaql23eo6n1hnlmfnggy.png" alt="Roger's Logo" className='logo-upd-user' />
      <h1 className='edit-product'>Edit product details</h1>
      <form onSubmit={handleSubmit} className='form-eidtProduct'>
        <div className="edit-productCode-productDescription">
          <input
            type="text"
            className="form edit-productCode"
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
            className="form edit-productDescription"
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
            className="btn btn-primary update-product-btn"
            style={{width: "75px"}}
          >Save</button>
      </form>
    </div>
   );
}
 
export default ProductEditPage;