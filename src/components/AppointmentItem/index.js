// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStar} = props
  const {id, title, date, isLiked} = appointmentDetails

  const likeImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onStarAppointment = () => {
    toggleStar(id)
  }

  return (
    <li className="appointment-item-card">
      <div className="top">
        <p className="appointment-card-title">{title}</p>
        <button
          className="btn"
          type="button"
          onClick={onStarAppointment}
          data-testid="star"
        >
          <img src={likeImageUrl} className="img" alt="star" />
        </button>
      </div>
      <p>{date}</p>
    </li>
  )
}

export default AppointmentItem
