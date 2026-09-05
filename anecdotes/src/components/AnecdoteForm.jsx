import { useAnecdoteActions } from '../store'
import anecdoteService from '../services/anecdotes'
import { useNotificationActions } from '../notificationStore'

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions()
  const { notify } = useNotificationActions()

  const createAnecdote = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const newAnecdote = await anecdoteService.createNew(content)
    add(newAnecdote)
    notify(`you created '${content}'`)
    event.target.reset()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="anecdote" data-testid="new" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
