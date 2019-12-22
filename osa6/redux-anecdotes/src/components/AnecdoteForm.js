import React from 'react'

import { createAnecdote } from '../reducers/anecdoteReducer'
import {setNotification, removeNotification} from '../reducers/notificationReducer'

const AnecdoteForm = props => {
  const addAnecdote = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    props.store.dispatch(createAnecdote(content))
    props.store.dispatch(setNotification(`you added '${content}'`))
    event.target.anecdote.value = ''
    setTimeout(() => props.store.dispatch(removeNotification()), 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
