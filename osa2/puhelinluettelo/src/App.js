import React, { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' },
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const addPerson = event => {
        event.preventDefault()
        const person = {
            name: newName,
            number: newNumber,
        }

        if (persons.filter(x => x.name === newName).length > 0) {
            alert(`${newName} is already added to phonebook`)
            return
        }

        setPersons(persons.concat(person))
        setNewName('')
    }

    const handleNameChange = event => setNewName(event.target.value)
    const handleNumberChange = event => setNewNumber(event.target.value)
    const handleFilterChange = event => setFilter(event.target.value)

    const personsToShow = filter
        ? persons.filter(x => x.name.toLowerCase().includes(filter.toLowerCase()))
        : persons

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter onChange={handleFilterChange} />
            <h3>Add a new</h3>
            <PersonsForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} name={newName} number={newNumber} addPerson={addPerson} />
            <h2>Numbers</h2>
            <Persons persons={personsToShow} />
        </div>
    )
}

export default App
