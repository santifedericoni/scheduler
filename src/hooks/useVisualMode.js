 import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  const [mode, setMode] = useState(initial);
  
  function transition(mode, replace = false) { 
    if (replace){
      history.pop();
    } 
    setHistory([...history, mode]);
    setMode(mode); 
   }
  function back() {
    if (history.length > 1){
    history.pop();
    setMode(history[history.length-1])
    }
   }
  return { mode, transition, back };
};


