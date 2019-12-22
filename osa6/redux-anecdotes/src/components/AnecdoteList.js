import React from 'react'
import Anecdote from './Anecdote'

import { addVote } from '../reducers/anecdoteReducer'
import {
  setNotification,
  removeNotification
} from '../reducers/notificationReducer'

const vote = (anecdote, store) => {
  return () => {
    store.dispatch(addVote(anecdote.id))
    store.dispatch(setNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => store.dispatch(removeNotification()), 5000)
  }
}

const getAnecdotes = store => {
  const anecdotes = store.getState().anecdotes
  const filter = store.getState().filter
  if (filter) {
    return anecdotes.filter(anecdote => anecdote.content.includes(filter))
  }
  return anecdotes
}

const AnecdoteList = ({ store }) => {
  return (
    <div>
      {getAnecdotes(store).map(anecdote => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={vote(anecdote, store)}
        />
      ))}
    </div>
  )
}

export default AnecdoteList
