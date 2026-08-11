import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

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
        description: task.description,
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

  function addTask(event) {
    event.preventDefault()

    fetch('http://localhost:8080/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        description: description,
        completed: false,
      }),
    })
      .then(response => response.json())
      .then(newTask => {
        setTasks([...tasks, newTask])
        setTitle('')
        setDescription('')
      })
      .catch(error => console.error('Error adding task:', error))
  }

  return (
    <main>
      <h1>OrganiseMe</h1>

      <section>
        <h2>Zadania</h2>

        <form onSubmit={addTask}>
          <input
            type="text"
            placeholder="Tytuł zadania"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />

          <input
            type="text"
            placeholder="Opis zadania"
            value={description}
            onChange={event => setDescription(event.target.value)}
          />

          <button type="submit">Dodaj</button>
        </form>

        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task)}
              />

              <div>
                <strong>{task.title}</strong>
                <p>{task.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App