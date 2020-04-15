import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header.js"
import Empty from "./Empty.js"
import Show from "./Show.js"



export default function Appointment(props) {
  console.log(props)
return (
  <article className="appointment">
  {props.time && <Header time = {props.time}/>}
  {props.interview && <Show />}
  {!props.interview && <Empty />}
  </article>

  )
}