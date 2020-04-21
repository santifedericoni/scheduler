import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";




export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
   const { onConfirm, onCancel, interviewers } = props;
  const Reset = function () {
    setInterviewer(null)
    setName("")
  }

  const Cancel = function () {
    props.onCancel()
    Reset()
  }
  const [error, setError] = useState("");
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
  
    props.onConfirm(name, interviewer);
  }


  return (
<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form  autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        onChange={(event) => setName(event.target.value)}
        type="text"
        placeholder="Enter Student Name"
        value = {name}
      />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList interviewers={interviewers} value={interviewer} onChange={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
    <Button onClick={Cancel} danger>Cancel</Button>
    <Button onSubmit={event => event.preventDefault()} onClick={() =>{validate()}} confirm>Confirm</Button>
    </section>
  </section>
</main>
)}