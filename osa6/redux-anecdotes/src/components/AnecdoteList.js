import React from 'react'
import Anecdote from './Anecdote'

import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ store }) => {
  return (
    <div>
      {store.getState().anecdotes.map(anecdote => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => store.dispatch(addVote(anecdote.id))}
        />
      ))}
    </div>
  )
}

export default AnecdoteList
