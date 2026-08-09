import './App.css'

function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/api/tasks')
    .then(response => response.json())
    .then(data => setTasks(data))
    .catch(error => console.error('Error retrieving tasks:', error))
  }, [])

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
              readOnly
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