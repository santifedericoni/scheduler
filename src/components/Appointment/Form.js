import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";




export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const Reset = function () {
    setInterviewer(null)
    setName("")
  }

  const Cancel = function () {
    props.onCancel()
    Reset()
  }
  return (
<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        onChange={(event) => setName(event.target.value)}
        type="text"
        placeholder="Enter Student Name"
        value = {name}
      />
    </form>
    <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
    <Button onClick={Cancel} danger>Cancel</Button>
    <Button onSubmit={event => event.preventDefault()} onClick={props.onConfirm} confirm>Confirm</Button>
    </section>
  </section>
</main>
)}