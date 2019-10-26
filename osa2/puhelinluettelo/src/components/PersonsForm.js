import React from 'react'

const PersonsForm = props => {
    return (
        <form onSubmit={props.addPerson}>
                <div>
                    name: <input onChange={props.handleNameChange} value={props.name} />
                </div>
                <div>
                    number:{' '}
                    <input onChange={props.handleNumberChange} value={props.number} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
    )
}

export default PersonsForm