import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ onClick, text }) => <button onClick={onClick}> {text} </button>

const Statistics = ({ good, bad, neutral }) => {
  if (!good && !bad && !neutral) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  const total = good + bad + neutral
  const avg = (good - bad) / total
  const positive = (good / total) * 100 + " %"
  return (
    <table>
      <tbody>
        <Statistic text={"good"} value={good} />
        <Statistic text={"neutral"} value={neutral} />
        <Statistic text={"bad"} value={bad} />
        <Statistic text={"all"} value={total} />
        <Statistic text={"average"} value={avg} />
        <Statistic text={"positive"} value={positive} />
      </tbody>
    </table>
  )
}

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}


const App = () => {
  const header1 = 'give feedback'
  const header2 = 'statistics'
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseCount = (feedBackType, setter) => () => setter(feedBackType + 1)

  return (
    <div>
      <Header text={header1} />
      <Button onClick={increaseCount(good, setGood)} text='good' />
      <Button onClick={increaseCount(neutral, setNeutral)} text='neutral' />
      <Button onClick={increaseCount(bad, setBad)} text='bad' />
      <Header text={header2} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)