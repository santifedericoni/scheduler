import DayList from "components/DayList";
import React, { useState, UseEffect } from "react";
import "components/Application.scss";
import "components/Appointment";
import Appointment from "components/Appointment";
import axios from 'axios';
import {getAppointmentsForDay,getInterview, getInterviewersByDay} from "helpers/selectors"


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

    React.useEffect(() => {
        
      Promise.all([
        axios.get(`http://localhost:8080/api/days`),
        axios.get(`http://localhost:8080/api/appointments`),
        axios.get(`http://localhost:8080/api/interviewers`)
      ])
      .then ((all) => {
        setState(Object.assign({}, state, { appointments: all[1].data, days: all[0].data, interviewers: all[2].data}))
      })
    }, [] );


    function bookInterview(appointmentId, interview) {
      const appointment = {
        ...state.appointments[appointmentId],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [appointmentId]: appointment
      };
      const days = state.days.map(day =>  {
        
        if (day.appointments.includes(appointmentId) && !state.appointments[appointmentId].interview) {
          return {
            ...day,
            spots: day.spots - 1
          };
        } else {
          return day;
        }
      });

      return axios.put(`http://localhost:8080/api/appointments/${appointmentId}`,appointment)
      .then (()=> {
        setState({
          ...state,
          appointments,
          days 
        });
      })
    }

    function cancelInterview (appointmentId){  
      const appointment = {
        ...state.appointments[appointmentId],
        interview: null
      };
      const appointments = {
        ...state.appointments,
        [appointmentId]: appointment
      };
      const days = state.days.map(day =>  {
          return {
            ...day,
            spots: day.spots + 1
          };
      });
      return axios.delete(`http://localhost:8080/api/appointments/${appointmentId}`,appointment)
      .then (()=> {
        setState({
          ...state,
          appointments,
          days 
        });
      })
    }
 
    const appointments = getAppointmentsForDay(state, state.day);
    const interviewers = getInterviewersByDay(state, state.day);
    const schedule = appointments.map((appointment) => {
      const interview = getInterview(state, appointment.interview);

      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={interviewers}
          bookInterview = {bookInterview}
          cancelInterview = {cancelInterview}
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
          {schedule}
          <Appointment key="last" time="5pm" />
        </section>
      </main>
    )
}
