import moment from 'moment-timezone'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import momentDurationFormatSetup from 'moment-duration-format'
import EditBtn from '../EditBtn'

const SingleTimesheetApprover = ({timesheet, selectedTimesheets, setSelectedTimesheets}) => {
  const [status, setStatus] = useState(false)

  const selectCheckbox = (timesheet) => {
    setStatus(true)
    setSelectedTimesheets([...selectedTimesheets, timesheet])
  }

  const disselecteCheckbox = (timesheet) => {
    const result = selectedTimesheets.filter(t => t !== timesheet)
    setStatus(false)
    setSelectedTimesheets(result)
  }

  return (
    <tr>
      <th scope="row">{timesheet.employeeId.name}</th>
      <td>{timesheet.employeeId.employeeCode}</td>
      <td>{new Date(timesheet.clockIn).toLocaleString().split(',')[0]}</td>
      <td>{new Date(timesheet.clockIn).toLocaleString().split(',')[1]}</td>
      {timesheet.clockOut !== null ? 
      <td>{new Date(timesheet.clockOut).toLocaleString().split(',')[1]}</td> :
      <td>Waiting clockout</td>
      }

      {timesheet.clockOut !== null ?
        timesheet.employeeId.fulltime === true ? 
          <td>{ moment.duration(((moment(timesheet.clockOut).diff(timesheet.clockIn))/1000 - 1800), "seconds").format("h:mm") }</td> :
          <td>{ moment.duration(((moment(timesheet.clockOut).diff(timesheet.clockIn))/1000 + 900), "seconds").format("h:mm") }</td>
          : <td>Waiting clockout</td>
      } 

      <td>
        <div className="input-checkbox">
          <input
            type="checkbox"
            disabled={timesheet.status === false ? false : true}
            defaultChecked={status}
            onClick={ e => {
              status ? disselecteCheckbox(timesheet._id) : selectCheckbox(timesheet._id)
            }}
          />
          <span id={timesheet.status === false ? "display-approved" : "hide-approve"} className='formerEmployee'>{timesheet.status === false ? "Approve" : "Approved "}</span>
        </div>
      </td>
      <td>
        <EditBtn timesheet={timesheet} status={status}/>      
      </td>
    </tr>
  )
}

export default SingleTimesheetApprover