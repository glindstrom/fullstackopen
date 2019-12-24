import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'ADD_VOTE':
      const updatedAnecdote = action.data
      return state
        .map(anecdote =>
          anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
        )
        .sort((a, b) => (a.votes > b.votes ? -1 : 1))
    default:
      return state
  }
}

export const addVote = anecdote => {
  return async dispatch => {
    const anecdoteWithVoteAdded = { ...anecdote, votes: anecdote.votes + 1 }
    const updatedAnecdote = await anecdoteService.update(anecdoteWithVoteAdded)
    dispatch({
      type: 'ADD_VOTE',
      data: updatedAnecdote
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer
