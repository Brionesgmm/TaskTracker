import { useState, useEffect } from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from "./components/Header"
import Footer from "./components/Footer"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"
import About from "./components/About";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect( () => {
    const getTasks = async () => {
      const tasksFromDB = await fetchTasks()
      setTasks(tasksFromDB)
    }

    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('/tasks')
    const data = await res.json()

    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`/tasks/${id}`)
    const data = await res.json()

    return data
  }

const addTask = async (task) => {
  const res = await fetch(`/tasks`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  const data = await res.json()

  setTasks([...tasks, data])

  // const id = Math.floor(Math.random()*10000) + 1
  // const newTask = {id, ...task}
  // setTasks([...tasks, newTask])
}

const deleteTask = async (id) => {
  await fetch(`/tasks/${id}`, {
    method: 'DELETE'
  })
  
  setTasks(tasks.filter(task => task.id!==id))
}

const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

  const res = await fetch(`/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updatedTask)
  })

  const data = await res.json()

  setTasks(
    tasks.map(task => {
     return task.id === id ? {...task, reminder: data.reminder} : task
    })
  )
}

  return (
    <Router>
    <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        {showAddTask && <AddTask onAdd={addTask}/>}
        <Routes>
           <Route
            path='/'
            element={
              <>
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  'No Tasks To Show'
                )}
              </>
            }
          />
          <Route path="/about" Component={About}/>
          </Routes>
          <Footer />
    </div>
    </Router>
  );
}

export default App;
