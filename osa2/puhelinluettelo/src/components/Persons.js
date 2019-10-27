import React from 'react'

const Person = ({ person, onClick }) => {
    return (
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td><button onClick={onClick(person)}>delete</button></td>
        </tr>
    )
}

const Persons = ({ persons, removePerson }) => {
    const personsMap = () =>
        persons.map(person => <Person key={person.name} person={person} onClick={removePerson} />)
    return (
        <table>
            <tbody>{personsMap()}</tbody>
        </table>
    )
}

export default Persons
