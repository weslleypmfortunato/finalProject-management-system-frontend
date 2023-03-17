import './MissingProductPage.css'
import NavbarAdminAll from "../../components/1.Components_Employees&Users_Environment/4.Navbar_Admin_All/NavbarAdminAll";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import AddMissingProducts from "../../components/AddMissingProducts";

const MissingProductPage = () => {

  const oneDayBefore = new Date(Date.now() - ( 3600 * 1000 * 24 ))
  const twoDaysAfter = new Date(Date.now() + ( 3600 * 1000 * 24 ))

  const [missingProducts, setMissingProducts] = useState([])
  const [startDate, setStartDate] = useState(oneDayBefore.toJSON().slice(0, 10).replace('/','-'))
  const [endDate, setEndDate] = useState(twoDaysAfter.toJSON().slice(0, 10).replace('/','-'))

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
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/missing-products?startDate=${startDate}&endDate=${endDate}`, { headers })
      .then(response => {
        setMissingProducts(response.data)
      }).catch (error => {
        messageError(error.response.data.message)
      })
  }, [startDate, endDate])

  return (
    <div className="MissingProducsPage">
      <NavbarAdminAll />
      <img src="https://res.cloudinary.com/weslley-m-fortunato/image/upload/v1677396073/rogers_images/eaql23eo6n1hnlmfnggy.png" alt="Roger's Logo" className='logo-create-new-user' />
      <button
        type="submit"
        className="btn btn-outline-success add-newProductPage"
        id={loggedInUser.user.level === "admin" ? "showAddProductBtn" : "hideAddProductBtn"}
        style={{width: "220px"}}
      ><Link to='/products'>Create new Product Page</Link>
      </button>
      <h1 className='missing-items-list'>Missing Items List</h1>
      <form onSubmit={handleSubmit} className='form-missing-product'>
        <input 
          type="date" 
          className="filteredDate"
          name="filterDate"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
        <input 
          type="date" 
          className="filteredDate"
          name="filterDate"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
        />
      </form>
      <AddMissingProducts />

      <table className="table table-hover table-sm">
        <thead>
          <tr>
            <th scope="col" className='details-table product'>Product Code</th>
            <th scope="col" className='details-table description'>Description</th>
            <th scope="col" className='details-table quantity'>Quantity</th>
          </tr>
        </thead>
        <tbody>
      
        {missingProducts.length > 0 && missingProducts.map(product => {
          return (
            <tr key={product._id} className='test'>
              <th scope="row">{product.productCode}</th>
              <td className='productDescription'>{product.productDescription}</td>
              <td>{product.totalQuantity}</td>
            </tr>
          )
       })}
       </tbody>
      </table>
    </div>
  )
}

export default MissingProductPage