import '../2.My_Timesheet_Page/MyTimesheetPage.css'
import NavbarAdminAll from '../../../components/1.Components_Employees&Users_Environment/4.Navbar_Admin_All/NavbarAdminAll';
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { useParams, Link } from 'react-router-dom';
import SingleTimesheetApprover from '../../../components/1.Components_Employees&Users_Environment/7.Timesheet_Approver/SingleTimesheetApprover';
require('moment-precise-range-plugin')

const TimesheetDetailsPage = () => {

  const dayBefore = new Date(Date.now() - ( 3600 * 1000 * 24))

  const [timesheets, setTimesheets] = useState([])
  const [refresh] = useState(true)
  const [startDate, setStartDate] = useState(dayBefore.toJSON().slice(0,10).replace('/','-'))
  const [endDate, setEndDate] = useState(new Date().toJSON().slice(0,10).replace('/','-'))
  const [selectedTimesheets, setSelectedTimesheets] = useState([])

  const { id } = useParams()

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
    axios.get(`${process.env.REACT_APP_API_URL}/timesheet/${id}?startDate=${startDate}&endDate=${endDate}`, { headers })
    .then(response => {
      setTimesheets(response.data)
    }).catch (error => {
      messageError(error.response.data.message)
    })
  }, [ refresh ])

  const handleSubmit = e => {
    e.preventDefault()

    axios.put(`${process.env.REACT_APP_API_URL}/user/edit/${id}`, {})
      .then(response => {
      }).catch (error => {
      messageError(error.response.data.message)
    })
    }

    const massApproval = () => {
      const approvedTimesheets = timesheets.filter((timesheet) => {
        return timesheet.status === false
      }).map(approvedTimesheet => {
        return approvedTimesheet._id
      })
      
      axios.put(`${process.env.REACT_APP_API_URL}/timesheet/approval`, {ids: selectedTimesheets}, {headers})
      .then(response => {
        window.location.reload()
        Swal.fire({
          text: "Timesheets approved",
          imageUrl: "https://res.cloudinary.com/weslley-m-fortunato/image/upload/v1677396949/rogers_images/lfn5fdhvz3tcezcagj1s.png",
          imageWidth: 100,
          imageHeight: 100,
          imageAlt: 'Custom image',
        })
      }).catch (error => {
        messageError(error.response.data.message)
      })
    }

  return (
    <div className="TimesheetByPerson">
      <NavbarAdminAll />
      <div className="image-h1-myTimesheet">
        <h1 className='h1-my-timesheet'>Timesheet Validation Page</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="initial-final-date">
          <input
            type="date"
            className='initial-date'
            name="startDate"            
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className='final-date'
            name="endDate"            
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
        </div>
        <div className="btns-search-save">
          <button
            type="submit"
            className="btn btn-primary search-timesheet"
            style={{width: "75px"}}
            onClick={handleSubmit}
          >Search
          </button>
          <button
            type="submit"
            className="btn btn-warning approve-timesheet"
            style={{width: "75px"}}
            onClick={massApproval}
          >Save </button>
        </div>
      </form>

      <table className="table table-hover table-sm align-middle">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Employee Code</th>
            <th scope="col">Date</th>
            <th scope="col">Clock In</th>
            <th scope="col">Clock Out</th>
            <th scope="col">Worked Hours</th>
            <th scope="col">Approve</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
        {timesheets.length > 0 &&  timesheets.map(timesheet => {
            return (
              <SingleTimesheetApprover timesheet={timesheet} selectedTimesheets={selectedTimesheets} setSelectedTimesheets={setSelectedTimesheets} key={timesheet._id}/>
            )
          })
        }
        </tbody>
      </table>
      <Link to={'/timesheet'}>Back</Link>
    </div>
  )
}

export default TimesheetDetailsPage
