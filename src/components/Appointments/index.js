// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isLiked: !eachAppointment.isLiked}
        }
        return eachAppointment
      }),
    }))
  }

  getStarredAppointment = () => {
    const {appointmentsList} = this.state
    this.setState({
      appointmentsList: appointmentsList.filter(
        eachAppointment => eachAppointment.isLiked === true,
      ),
    })
  }

  renderAppointmentsList = () => {
    const {appointmentsList} = this.state

    return appointmentsList.map(eachAppointment => (
      <AppointmentItem
        key={eachAppointment.id}
        appointmentDetails={eachAppointment}
        toggleStar={this.toggleStar}
      />
    ))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const appointmentDate = format(new Date(dateInput), 'dd MMMM yyyy, EEEE')

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: appointmentDate,
      isLiked: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
    }))
  }

  onChangeTitleInput = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  onChangeDateInput = event => {
    this.setState({
      dateInput: event.target.value,
    })
  }

  render() {
    const {titleInput, dateInput} = this.state

    return (
      <div className="bg-container">
        <div className="appointment-card">
          <div className="appointment-details">
            <form className="form" onSubmit={this.onAddAppointment}>
              <h1 className="card-heading">Add Appointment</h1>
              <label for="title" className="input-title">
                TITLE
              </label>
              <input
                id="title"
                className="input-box"
                placeholder="Title"
                type="text"
                onChange={this.onChangeTitleInput}
                value={titleInput}
              />
              <label for="date" className="input-title">
                DATE
              </label>
              <input
                id="date"
                className="input-box"
                type="date"
                onChange={this.onChangeDateInput}
                value={dateInput}
              />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              className="appointment-img"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr />
          <div className="bottom-container">
            <h1 className="appointments-title">Appointments</h1>
            <button
              type="button"
              className="starred-btn"
              onClick={this.getStarredAppointment}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-items">{this.renderAppointmentsList()}</ul>
        </div>
      </div>
    )
  }
}

export default Appointments
