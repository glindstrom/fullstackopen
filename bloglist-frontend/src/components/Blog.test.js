import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const blog = {
    title: 'blog title',
    author: 'blog author',
    url: 'https://example.com',
    user: {
      name: 'John Doe'
    },
    likes: 666
  }
  const user = {
    name: 'John Doe'
  }

  beforeEach(() => {
    component = render(<Blog blog={blog} user={user} />)
  })

  test('author and title are displayed initially', () => {
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
  })

  test('details are not displayed initially', () => {
    const div = component.container.querySelector('.details')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking on a blog, details are displayed', () => {
    const infoDiv = component.container.querySelector('.info')
    fireEvent.click(infoDiv)

    const detailsDiv = component.container.querySelector('.details')

    expect(detailsDiv).not.toHaveStyle('display: none')
  })
})
