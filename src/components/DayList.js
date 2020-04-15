import React from "react";
import DayListItem from "components/DayListItem";
import "components/DayListItem.scss";

export default function DayList(props) {
  const days = props.days;

  return (
    <ul>
      {days.map((day) => <DayListItem  key = {day.id }name={day.name} spots={day.spots} selected={day.name === props.day} setDay={props.setDay}  />)}
    </ul>
  );
}