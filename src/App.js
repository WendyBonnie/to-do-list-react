import React, { useEffect, useState } from "react";
import "./App.css";
import TaskToDo from "./task/taskToDo";

function App() {
  const [newTask, setNewTask] = useState({ content: "", statut: "A faire" });
  const [taskList, setTaskList] = useState([]);

  //handle mon objet et modifie seulement son content

  const handleChange = (e) => {
    setNewTask((previousValue) => {
      return {
        ...previousValue,
        content: e.target.value,
      };
    });
  };

  //j'ajoute une tâche à mon tableau
  const addTask = () => {
    setTaskList([...taskList, newTask]);
    console.log("task", taskList);
  };

  //je modifie de à faire à en cours
  const toDoToPending = (task) => {
    setTaskList((todoList) =>
      todoList.map((item) =>
        item === task ? { ...item, statut: "En cours" } : item
      )
    );
  };

  //je modifie de en cours à terminé
  const toPendingToDone = (task, i) => {
    setTaskList((todoList) =>
      todoList.map((item) =>
        item === task ? { ...item, statut: "Terminé" } : item
      )
    );
  };

  const renderTaskToDo = () => {
    let filter = taskList?.filter((item) => {
      return item.statut === "A faire";
    });
    return filter?.map((item, index) => {
      return (
        <TaskToDo
          content={item.content}
          state={item.statut}
          key={index}
          action={() => toDoToPending(item, index)}
        />
      );
    });
  };

  const renderTaskPending = () => {
    let filter = taskList.filter((e) => {
      return e.statut === "En cours";
    });
    return filter?.map((item, index) => {
      return (
        <TaskToDo
          key={index}
          content={item.content}
          state={item.statut}
          action={() => toPendingToDone(item)}
        />
      );
    });
  };
  const renderTaskDone = () => {
    let filter = taskList.filter((e) => {
      return e.statut === "Terminé";
    });
    return filter.map((item, index) => {
      return (
        <TaskToDo key={index} content={item.content} state={item.statut} />
      );
    });
  };

  // useEffect pour mettre à jour ma new task

  useEffect(() => {
    console.log("test", newTask);
  }, [newTask]);

  // je décide de créer un autre useeffect pour vérifier si mon tableau tasklist change avec mon console.log, j'aurais pu le laisser dans l'autre useEffect mais mon console log se déclencherait à chaque fois que j'écris quelque chose dans new task
  useEffect(() => {
    console.log("taskList", taskList);
  }, [taskList]);

  return (
    <div className="App">
      <div className="center">
        <h1>Ma super to do list </h1>
        <input onChange={handleChange} />
        <button onClick={addTask}>Valider</button>
      </div>
      <div className="display">
        <div>
          <h1> A faire </h1>

          <div>{renderTaskToDo()}</div>
        </div>
        <div>
          <h1> En cours </h1>

          <div>{renderTaskPending()}</div>
        </div>
        <div>
          <h1> Terminé </h1>

          <div>{renderTaskDone()}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
