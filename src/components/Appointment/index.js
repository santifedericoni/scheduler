import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header.js"
import Empty from "./Empty.js"
import Show from "./Show.js"
import Form from "./Form.js"
import Status from "./Status.js"
import Confirm from "./Confirm.js"
import Error from "./Error.js"

import useVisualMode from "../../hooks/useVisualMode.js"


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDITING = "EDITING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const DECREASE_DAYS_SPOTS = "DECREASE_DAYS_SPOTS";



export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then (() => {
      transition(SHOW)
    })
    .catch(() => {
      transition(ERROR_SAVE,true)
    })
  }

  function deleteCard(name, interviewer) {
    transition(DELETING)
    props.cancelInterview(props.id)
    .then (() => { 
      transition(EMPTY)
    })
    .catch(() => {
      transition(ERROR_DELETE,true)
    })

  }

  return (
  <article className="appointment">
  {props.time && <Header time = {props.time}/>}
  {mode === EMPTY && <Empty onAdd={()=>{transition(CREATE)}}  />}
  {mode === CREATE && <Form interviewers={props.interviewers} onCancel={()=>{back()}}  onConfirm= {save} />}
  {mode === SAVING && <Status message = "Saving" />}
  {mode === DELETING && <Status message = "Deleting" />}
  {mode === CONFIRM && <Confirm onCancel={()=>{back()}}  onConfirm= {deleteCard} />}
  {mode === EDITING  && <Form interviewers={props.interviewers} interviewer={props.interview.interviewer.id}
                       onConfirm= {save} onCancel={()=>{back()}}
                        name = {props.interview.student}/> }
  {mode === ERROR_SAVE && <Error message = "There was an error to crete the interview" onClose={()=>{transition(EMPTY)}}/>}
       
  {mode === ERROR_DELETE && <Error message = "There was an error to deleting the interview" onClose={()=>{transition(SHOW)}}/>}         
  
  {mode === SHOW && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onDelete = {()=>{transition(CONFIRM)}}
      onEdit = {()=>{transition(EDITING)}}
    />
    )}
  </article>

  )
}