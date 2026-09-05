import { useAnecdotes, useAnecdoteActions } from '../store'
import { useNotificationActions } from '../notificationStore'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { vote } = useAnecdoteActions()
  const { notify } = useNotificationActions()
  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)

  const voteFor = async anecdote => {
    await vote(anecdote.id)
    notify(`you voted '${anecdote.content}'`)
  }

  return sortedAnecdotes.map(anecdote => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => voteFor(anecdote)}>vote</button>
      </div>
    </div>
  ))
}

export default AnecdoteList
