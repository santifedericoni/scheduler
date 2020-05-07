import React, { useState } from "react";
import axios from 'axios';


export default function useApplicationData () {
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

  const setDay = (day)=>{ setState(prevState => ({ ...prevState, day }))};

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
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}

