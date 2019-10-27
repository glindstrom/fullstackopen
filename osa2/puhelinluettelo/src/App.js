import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    useEffect(() => {
        personService.getAll().then(persons => setPersons(persons))
    }, [])

    const addPerson = event => {
        event.preventDefault()
        const person = {
            name: newName,
            number: newNumber,
        }

        const existingPersons = persons.filter(x => x.name === newName)
        if (existingPersons.length > 0) {
            const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
            if (result) {
                person.id = existingPersons[0].id
                personService.update(person.id, person).then(returnedPerson => {
                    setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))    
                })
            }
            return
        }

        personService.create(person).then(person => {
            setPersons(persons.concat(person))
            setNewName('')
        })
    }

    const handleNameChange = event => setNewName(event.target.value)
    const handleNumberChange = event => setNewNumber(event.target.value)
    const handleFilterChange = event => setFilter(event.target.value)

    const removePerson = person => () => {
        const result = window.confirm(`Delete ${person.name} ?`)
        if (result) {
            personService
                .remove(person.id)
                .then(() => setPersons(persons.filter(x => x.id !== person.id)))
        }
    }

    const personsToShow = filter
        ? persons.filter(x =>
              x.name.toLowerCase().includes(filter.toLowerCase())
          )
        : persons

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter onChange={handleFilterChange} />
            <h3>Add a new</h3>
            <PersonsForm
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                name={newName}
                number={newNumber}
                addPerson={addPerson}
            />
            <h2>Numbers</h2>
            <Persons persons={personsToShow} removePerson={removePerson} />
        </div>
    )
}

export default App
