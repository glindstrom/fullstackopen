import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    useEffect(() => {
        axios
          .get('http://localhost:3001/persons')
          .then(response => {
            setPersons(response.data)
          })
      }, [])

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
