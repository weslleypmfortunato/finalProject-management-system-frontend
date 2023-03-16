import './ProductsListPage.css'
import NavbarAdminAll from "../../components/1.Components_Employees&Users_Environment/4.Navbar_Admin_All/NavbarAdminAll";
import SearchBarProduct from '../../components/1.Components_Employees&Users_Environment/5.Search_Bars/SearchBarProducts';
import axios from "axios";
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

const ProductsListPage = () => {
  const [products, setProducts] = useState([])
  const [refresh] = useState(true)

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

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/products`, { headers })
      .then(response => {
        setProducts(response.data)
      }).catch (error => {
        messageError(error.response.data.message)
      })
  }, [refresh])

  return (
    <div className="ProductsListPage">
      <NavbarAdminAll />
      <SearchBarProduct />
      <img src="https://res.cloudinary.com/weslley-m-fortunato/image/upload/v1677396073/rogers_images/eaql23eo6n1hnlmfnggy.png" alt="Roger's Logo" className='logo-create-new-user' />
      <h1 className="current-products-list">Current Products List</h1>
      <div className="createNewProducts-btn">
        <Link to='/products/new'>
          <button
            type="button"
            className="btn btn-primary createNewProduct-btn"
            id={loggedInUser.user.level !=="admin" ? "no-newProduct-btn" : "show-product-btn"}
            >Add new Product
          </button>
        </Link>
      </div>
      <div className="products-list">
      {products.length > 0 && products.map(product => {
        return (
          <div key={product._id} className="single-employee-card">
            <div className="single-product">
              <Link to={`/product/edit/${product._id}`}>
                <p className="product-line">{product.productCode} - {product.productDescription}</p>
              </Link>
            </div>
          </div>
        )
      })}
    </div>
    <div className="link">
      <Link className='home-link' to={'/home'} >Home</Link>
    </div>
    </div>
  )
}

export default ProductsListPage