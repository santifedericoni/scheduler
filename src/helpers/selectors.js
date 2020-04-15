export function getAppointmentsForDay(state, selectedDay) {
  const matchedDay = state.days.filter(day => day.name === selectedDay);
  return (matchedDay.length === 0 ? [] : matchedDay[0].appointments.map(appointmentID => state.appointments[appointmentID]));
}
