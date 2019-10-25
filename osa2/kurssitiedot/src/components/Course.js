import React from 'react'

const Header2 = ({text}) => <h2>{text}</h2>

const Content = ({parts}) => {

    return (
        <div>
            {parts.map((element, index) => {
                return <Part key={index} name={element.name} exercises={element.exercises} />
            })}
        </div>
    )
}

const Part = ({name, exercises}) => {
    return (
        <p>
            {name} {exercises}
        </p>
    )
}

const Total = ({parts}) => {
    const total = parts.reduce((sum, x) => sum + x.exercises, 0)
    return (
        <p>
            <b>total of {total} exercises</b>
        </p>
    )
}

const Course = ({ course }) => {
    return (
        <>
            <Header2 text={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

export default Course