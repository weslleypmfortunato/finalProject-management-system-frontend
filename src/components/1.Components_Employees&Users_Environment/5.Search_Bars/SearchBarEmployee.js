import './SearchBarEmployee.css'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SearchBarEmployee() {
  const [results, setResults] = useState([])
  const [search, setSearch] = useState('')

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  const headers = {
    Authorization: `Bearer ${loggedInUser.jwt}`
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/users`, { headers })
    .then(response => {
      setResults(response.data)
    }).catch(err => console.log(err))
  }, [])

  return (
    <div className="SearchBarEmployee" id="navbarSupportedContent">
      <div className="input">
        <input 
          type="text"
          className='form-control search-input'
          id="mysearchbarstyle"
          placeholder="Search for an employee"
          aria-label='employee'
          aria-describedby='basic-addon1'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />            
        <div className="search-list">
          { (search !== "" && search.length >= 1) && results.filter(result => {
            return (result.name.toLowerCase().includes(search.toLowerCase()))
          }).map((post, index) => (
            <div className="box" key={index}>
              <Link to={`/user/${post._id}`} style={{textDecoration: "none"}}>
                <p style={{color: "black" }} className="search-result"> {post.name}</p>
              </Link>
            </div>
          ))
        }
        </div>
      </div>
    </div>
  );
}

export default SearchBarEmployee