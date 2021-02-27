import Header from "./components/Header";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Footer from "./components/Footer";
import About from "./components/About";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  const [showAddTask, setshowAddTask] = useState(false);
  const [tasks, settasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      settasks(tasksFromServer);
    };
    getTasks();
  }, []);

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:2705/api/v1/tasks/${id}`);
    const data = await res.json();
    const task = data.data.task;
    return task;
  };

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:2705/api/v1/tasks");
    const data = await res.json();
    console.log(data);
    const tasks = data.data.tasks;
    return tasks;
  };

  const addTask = async (task) => {
    const res = await fetch(`http://localhost:2705/api/v1/tasks`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    const addedTask = data.data.task;
    settasks([...tasks, addedTask]);
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:2705/api/v1/tasks/${id}`, {
      method: "DELETE",
    });
    settasks(tasks.filter((task) => task._id !== id));
  };

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:2705/api/v1/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    const data = await res.json();
    settasks(
      tasks.map((task) =>
        task._id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };
  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setshowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Route
          path="/"
          exact
          render={(props) => {
            return (
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  "No task to show"
                )}
              </>
            );
          }}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
