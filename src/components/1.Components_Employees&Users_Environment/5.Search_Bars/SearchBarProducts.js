import './SearchBarEmployee.css'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'

function SearchBarProduct() {
  const [results, setResults] = useState([])
  const [search, setSearch] = useState('')

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
      setResults(response.data)
    }).catch (error => {
      messageError(error.response.data.message)
    })
  }, [])

  return (
    <div className="SearchBarEmployee" id="navbarSupportedContent">
      <div className="input">
        <input 
          type="text"
          className='form-control search-input'
          id="mysearchbarstyle"
          placeholder="Search for a product"
          aria-label='employee'
          aria-describedby='basic-addon1'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />            
        <div className="search-list">
          { (search !== "" && search.length >= 1) && results.filter(result => {
            return (result.productDescription.toLowerCase().includes(search.toLowerCase()))
          }).map((post, index) => (
            <div className="box" key={index}>
              <Link to={`/product/edit/${post._id}`} style={{textDecoration: "none"}}>
                <p style={{color: "black" }} className="search-result"> {post.productDescription}</p>
              </Link>
            </div>
          ))
        }
        </div>
      </div>
    </div>
  );
}

export default SearchBarProduct