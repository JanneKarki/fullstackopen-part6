import { useState } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import NotificationContext from './NotificationContext'
import { useAnecdotes } from './hooks/useAnecdotes'

const App = () => {
  const [notification, setNotification] = useState(null)
  const { anecdotes, isPending, isError, vote } = useAnecdotes()

  const notify = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 5000)
  }

  const handleVote = (anecdote) => {
    vote(anecdote)
    notify(`anecdote '${anecdote.content}' voted`)
  }

  if (isPending) {
    return <div>loading data...</div>
  }

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <NotificationContext.Provider value={{ notification, notify }}>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </NotificationContext.Provider>
  )
}

export default App
