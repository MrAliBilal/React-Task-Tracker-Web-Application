import { useEffect, useState } from "react"
import { BrowserRouter as Router1, Route, Routes } from "react-router-dom";

import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {

  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState ([])

  useEffect( ()=> {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

// fetch data
const fetchTasks = async () => {
  const res = await fetch ('http://localhost:5000/tasks')
  const data = await res.json()

  return data
}


// fetch Task
const fetchTask = async (id) => {
  const res = await fetch (`http://localhost:5000/tasks/${id}`)
  const data = await res.json()

  return data
}

// delete Task
const deleteTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })

    res.status === 200
    ? setTasks(tasks.filter((task)=> task.id !== id))
    : alert('Error Deleting this Task')
}

  const toggleReminder = async (id) => {

    const taskToToggle = await fetchTask(id)
    const upTask = { ...taskToToggle, reminder : !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(upTask),
      })

      
    const data = await res.json()


    setTasks(
      tasks.map((task) =>
      task.id === id ? { ...task, reminder: !task.reminder} : task
      )
    )
  }

  //Add Task
  const addTask = async (task) => {

    const res = await fetch ('http://localhost:5000/tasks',{
    method: 'POST',
    headers: {
      'content-type' : 'application/json',
    },
    body: JSON.stringify(task),

    })

    const data = await res.json()

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 1000)+ 1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
  }

  //


  return (
    <Router1>
    <div className="container">
      <Header title='Task Tracker' onAdd={ () => setShowAddTask (!showAddTask) }
      showAdd = {showAddTask}
      />
        <Routes>
          <Route
            path='/'
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
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
          <Route path='/about' element={<About />} />
        </Routes>
      <Footer/>
    </div>
    </Router1>
  );
}

export default App;
