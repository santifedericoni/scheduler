export  function getAppointmentsForDay(state, selectedDay) {
  const matchedDay = state.days.filter(day => day.name === selectedDay);
  return (matchedDay.length === 0 ? [] : matchedDay[0].appointments.map(appointmentID => state.appointments[appointmentID]));
}

export function getInterviewersByDay(state, day) {

  let intArray = [];
  let days = state.days.filter(item => {

    if (item.name === day) {

      intArray = item.interviewers.map(appt => {
        let interviewers = state.interviewers[appt]
        return interviewers;
      })
    }
  })
  return intArray;
}


export function getInterview(state, interview) {
  if (interview){
 const newObject = {
   student: interview.student,
   "interviewer": {  
        "id": interview.interviewer,
        "name": state.interviewers[interview.interviewer].name,
        "avatar": state.interviewers[interview.interviewer].avatar
      }
  }
    return newObject;
  } else {
    return null;
  }
}


