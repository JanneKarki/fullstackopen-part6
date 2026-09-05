import { useContext } from 'react'
import NotificationContext from '../NotificationContext'
import { useAnecdotes } from '../hooks/useAnecdotes'

const AnecdoteForm = () => {
  const { notify } = useContext(NotificationContext)
  const { addAnecdote } = useAnecdotes()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
    addAnecdote(content)
    notify(`anecdote '${content}' created`)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
