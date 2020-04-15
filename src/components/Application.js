import DayList from "components/DayList";
import React, { useState, UseEffect } from "react";
import "components/Application.scss";
import "components/Appointment";
import Appointment from "components/Appointment";
import axios from 'axios';

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

    React.useEffect(() => {
        axios
          .get(`http://localhost:8080/api/days`)
          .then(response => {
            console.log('this is the response',response.data)
            setState(Object.assign({}, state, { days: response.data }))
          });
      }, [] );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
      className="sidebar--centered"
      src="images/logo.png"
      alt="Interview Scheduler"
    />
    <hr className="sidebar__separator sidebar--centered" />
    <nav className="sidebar__menu">
      
    <DayList days={state.days} day={state.day} setDay={(day)=>{  setState(Object.assign({}, state, { day }))}} />
    </nav>
    <img
      className="sidebar__lhl sidebar--centered"
      src="images/lhl.png"
      alt="Lighthouse Labs"
    />
      </section>
      <section className="schedule">
        {appointments.map((appointment) => <Appointment key={appointment.id} {...appointment} />)}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
