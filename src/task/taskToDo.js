import React from "react";

import "./task.css";

function TaskToDo(props) {
  return (
    <div id="task-container">
      <h4>{props.content}</h4>
      {props.state === "Terminé" ? (
        <p>{props.state}</p>
      ) : (
        <button onClick={props.action}>{props.state}</button>
      )}
    </div>
  );
}
export default TaskToDo;
