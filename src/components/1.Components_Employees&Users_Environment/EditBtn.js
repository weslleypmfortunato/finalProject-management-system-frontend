import { Link } from "react-router-dom"

const EditBtn = ({timesheet, status}) => {

  return (
    <div>
      <Link to={`/timesheet/edit/${timesheet._id}`}>
        <button
          type="submit"
          disabled={timesheet.status === false ? false : true}
          className={timesheet.status === true ? "btn btn-outline-primary approve-timesheet" : "btn btn-primary approve-timesheet"}
          id={timesheet.status === false ? "display-edit" : "hide-edit-btn"}
          style={{width: "75px"}}
        >Edit </button>
      </Link>
      <p id={timesheet.status === false ? "hide-approved-msg" : "display-approved-msg"}><abbr title="Timesheet approved previously">ℹ️</abbr></p>
    </div>
  )
}

export default EditBtn
