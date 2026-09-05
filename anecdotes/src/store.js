
import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    vote: async id => {
      const anecdote = get().anecdotes.find(anecdote => anecdote.id === id)
      const updated = await anecdoteService.update(
        id,
        { ...anecdote, votes: anecdote.votes + 1 }
      )
      set(state => ({
        anecdotes: state.anecdotes.map(anecdote =>
          anecdote.id === id ? updated : anecdote
        )
      }))
    },
    add: anecdote => set(state => ({
      anecdotes: state.anecdotes.concat(anecdote)
    })),
    remove: async id => {
      await anecdoteService.remove(id)
      set(state => ({
        anecdotes: state.anecdotes.filter(anecdote => anecdote.id !== id)
      }))
    },
    setFilter: value => set(() => ({ filter: value })),
    initialize: anecdotes => set(() => ({ anecdotes }))
  }
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore(state => state.anecdotes)
  const filter = useAnecdoteStore(state => state.filter)

  return anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )
}

export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
