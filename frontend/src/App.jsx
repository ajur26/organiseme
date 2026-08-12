import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [filter, setFilter] = useState('active')

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

  function deleteTask(id) {
    fetch(`http://localhost:8080/api/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id))
      })
      .catch(error => console.error('Error deleting task:', error))
  }

  function startEditing(task) {
    setEditingId(task.id)
    setEditTitle(task.title)
    setEditDescription(task.description)
  }

  function saveTask(task) {
    fetch(`http://localhost:8080/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: editTitle,
        description: editDescription,
        completed: task.completed,
      }),
    })
      .then(response => response.json())
      .then(updatedTask => {
        setTasks(tasks.map(task =>
          task.id === updatedTask.id ? updatedTask : task
        ))

        setEditingId(null)
        setEditTitle('')
        setEditDescription('')
      })
      .catch(error => console.error('Error updating task:', error))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') {
      return !task.completed
    }

    if (filter === 'completed') {
      return task.completed
    }

    return true
  })

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

          <button type="submit">
            Dodaj
          </button>
        </form>

        <div>
          <button onClick={() => setFilter('all')}>
            Wszystkie
          </button>

          <button onClick={() => setFilter('active')}>
            Aktywne
          </button>

          <button onClick={() => setFilter('completed')}>
            Ukończone
          </button>
        </div>

        <ul>
          {filteredTasks.map(task => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task)}
              />

              {editingId === task.id ? (
                <div>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={event => setEditTitle(event.target.value)}
                  />

                  <input
                    type="text"
                    value={editDescription}
                    onChange={event => setEditDescription(event.target.value)}
                  />

                  <button onClick={() => saveTask(task)}>
                    Zapisz
                  </button>

                  <button onClick={() => setEditingId(null)}>
                    Anuluj
                  </button>
                </div>
              ) : (
                <div>
                  <strong>{task.title}</strong>
                  <p>{task.description}</p>

                  <button onClick={() => startEditing(task)}>
                    Edytuj
                  </button>
                </div>
              )}

              <button onClick={() => deleteTask(task.id)}>
                Usuń
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App