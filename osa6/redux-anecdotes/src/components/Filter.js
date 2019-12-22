import React from 'react'
import { filterChange } from '../reducers/filterReducer'

const Filter = props => {
  const handleChange = event => {
    const value = event.target.value
    props.store.dispatch(filterChange(value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
