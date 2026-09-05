import { beforeEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn()
  }
}))

import anecdoteService from './services/anecdotes'
import useAnecdoteStore, {
  useAnecdotes,
  useAnecdoteActions
} from './store'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('useAnecdoteActions', () => {
  it('initialize loads anecdotes from service', async () => {
    const mockAnecdotes = [
      { id: '2', content: 'Zustand manages state', votes: 3 },
      { id: '1', content: 'Testing is useful', votes: 0 }
    ]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(mockAnecdotes)
  })
})

describe('useAnecdotes sorting', () => {
  it('returns anecdotes in descending order by votes', () => {
    const anecdotes = [
      { id: '1', content: 'No votes', votes: 0 },
      { id: '2', content: 'Most votes', votes: 5 },
      { id: '3', content: 'Some votes', votes: 2 }
    ]
    useAnecdoteStore.setState({ anecdotes, filter: '' })

    const { result } = renderHook(() => useAnecdotes())

    expect(result.current).toEqual([
      anecdotes[1],
      anecdotes[2],
      anecdotes[0]
    ])
  })
})
