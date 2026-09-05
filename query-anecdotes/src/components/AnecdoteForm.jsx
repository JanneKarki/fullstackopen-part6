import { useAnecdotes } from '../hooks/useAnecdotes'
import { useNotify } from '../hooks/useNotify'

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdotes()
  const { notify } = useNotify()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
    addAnecdote(content, {
      onSuccess: () => notify(`anecdote '${content}' created`),
      onError: (error) => notify(error.message)
    })
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
