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
  const vote = id => {
    props.addVote(id)
    props.setNotification('you voted')
    setTimeout(() => props.removeNotification(), 5000)
  }

  return (
    <div>
      {props.anecdotesToShow.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
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
