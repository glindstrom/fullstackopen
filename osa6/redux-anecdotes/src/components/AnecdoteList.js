import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import {
  setNotification,
  removeNotification
} from '../reducers/notificationReducer'

const anecdotesToShow = ({ anecdotes, filter }) => {
  if (filter) {
    return anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
  }
  return anecdotes
}

const AnecdoteList = props => {
  const vote = anecdote => {
    props.addVote(anecdote)
    props.setNotification(`you voted '${anecdote.content}'`, 10)
  }

  return (
    <div>
      {props.anecdotesToShow.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = state => {
  console.log(state)
  return {
    anecdotesToShow: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  addVote,
  setNotification,
  removeNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
