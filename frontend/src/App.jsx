import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/api/tasks')
    .then(response => response.json())
    .then(data => setTasks(data))
    .catch(error => console.error('Error retrieving tasks:', error))
  }, [])

  function toggleTask(task) {
    fetch(`http://localhost:8080/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: task.title,
        description : task.description,
        completed: !task.completed,
      }),
    })
    .then(response => response.json())
    .then(updatedTask => {
      setTasks(tasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      ))
    })
    .catch(error => console.error('Error updating task:', error))
  }

  return (
    <main>
      <h1>OrganiseMe</h1>

      <section>
        <h2>Zadania</h2>
        
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task)}
              />
            <span>{task.title}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App