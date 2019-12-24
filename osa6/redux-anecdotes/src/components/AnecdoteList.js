import React from 'react'
import { connect } from 'react-redux'
import Anecdote from './Anecdote'

import { addVote } from '../reducers/anecdoteReducer'
import {
  setNotification,
  removeNotification
} from '../reducers/notificationReducer'

const vote = (props, anecdote) => {
  return () => {
    props.addVote(anecdote.id)
    props.setNotification(`you voted '${anecdote.content}'`)
    setTimeout(() => props.removeNotification(), 5000)
  }
}

const getAnecdotes = (anecdotes, filter) => {
  if (filter) {
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  }
  return anecdotes
}

const AnecdoteList = props => {
  console.log(props)
  return (
    <div>
      {getAnecdotes(props.anecdotes, props.filter).map(anecdote => (
        <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={vote(props, anecdote)} />
      ))}
    </div>
  )
}

const mapStateToProps = state => {
  console.log(state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
    addVote,
    setNotification,
    removeNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
