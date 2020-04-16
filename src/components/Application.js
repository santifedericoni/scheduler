import DayList from "components/DayList";
import React, { useState, UseEffect } from "react";
import "components/Application.scss";
import "components/Appointment";
import Appointment from "components/Appointment";
import axios from 'axios';
import {getAppointmentsForDay,getInterview} from "helpers/selectors"


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

    React.useEffect(() => {
        
      Promise.all([
        Promise.resolve(axios.get(`http://localhost:8080/api/days`)),
        Promise.resolve(axios.get(`http://localhost:8080/api/appointments`)),
        Promise.resolve(axios.get(`http://localhost:8080/api/interviewers`))
      ])
      .then ((all) => {
        console.log('test',all)
        setState(Object.assign({}, state, { appointments: all[1].data, days: all[0].data, interviewers: all[2].data}))  
      })
    }, [] );
    
    const appointments = getAppointmentsForDay(state, state.day);
    const schedule = appointments.map((appointment) => {
      const interview = getInterview(state, appointment.interview);
    
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
        />
      );
    });

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
