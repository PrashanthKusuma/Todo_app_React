import "./styles.css";
import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [update, setUpdate] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [temp, setTemp] = useState();
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${day}-${month}-${year}`;

  const addTask = (event) => {
    event.preventDefault();
    if (event.target.taskField.value) {
      setTasks((tasks) => [
        ...tasks,
        {
          id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
          task: event.target.taskField.value,
          date: currentDate,
          checked: false
        }
      ]);
    }
  };

  const deleteTask = (id) => {
    tasks.forEach((element) => {
      if (id === element.id) {
        tasks.splice(tasks.indexOf(element), 1);
      }
    });
    setTasks((tasks) => [...tasks]);
  };
  const check = (id) => {
    tasks.forEach((element) => {
      if (id === element.id) {
        element.checked = !element.checked;
      }
    });
    setTasks((tasks) => [...tasks]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setUpdate(!update);
    let temptest = tasks;
    if (event.target.updateTaskField.value) {
      temptest.forEach((element) => {
        if (taskId === element.id) {
          element.task = event.target.updateTaskField.value;
        }
      });
      setTasks(temptest);
    }
  };
  const UpdateTask = (props) => {
    tasks.forEach((element) => {
      props.taskId === element.id ? setTemp(element.task) : null;
    });
    return (
      <div className="updatebox">
        <div className="updatecard">
          <form onSubmit={handleSubmit}>
            <textarea name="updateTaskField" placeholder="Enter updated task">
              {temp}
            </textarea>
            <div className="buttons">
              <button type="submit">save</button>
              <button type="reset">reset</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  return (
    <div className="App">
      {update ? <UpdateTask taskId={taskId} /> : null}
      <div className="navbar">
        <form onSubmit={addTask} name="form">
          <input
            type="text"
            name="taskField"
            placeholder="Add your task here....."
          />
          <button type="submit">+</button>
        </form>
      </div>
      {tasks.length > 0 ? (
        <div className="tasks">
          {tasks &&
            tasks.map((element, index) => {
              return (
                <div className="card" key={index}>
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      onChange={() => check(element.id)}
                      checked={element.checked}
                    />
                  </div>
                  <div className="task">
                    <span
                      style={
                        element.checked
                          ? {
                              textDecorationLine: "line-through",
                              fontStyle: "italic"
                            }
                          : null
                      }
                    >
                      {element.task}
                    </span>
                  </div>
                  <span className="date">{element.date}</span>
                  <div className="buttons">
                    <button
                      onClick={() => {
                        setUpdate(!update);
                        setTaskId(element.id);
                      }}
                    >
                      edit
                    </button>
                    <button onClick={() => deleteTask(element.id)}>
                      delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="notasks">There are no tasks to display...</div>
      )}
    </div>
  );
}
