import React from 'react'

const Person = ({ person }) => {
    return (
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
        </tr>
    )
}

const Persons = ({ persons }) => {
    const personsMap = () =>
        persons.map(person => <Person key={person.name} person={person} />)
    return (
        <table>
            <tbody>{personsMap()}</tbody>
        </table>
    )
}

export default Persons
