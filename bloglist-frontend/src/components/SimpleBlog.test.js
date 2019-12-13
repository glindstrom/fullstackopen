import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders all fields', () => {
  const blog = {
    title: 'blog title',
    author: 'blog author',
    likes: 666
  }

  const component = render(<SimpleBlog blog={blog} />)

  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).toHaveTextContent(blog.author)
  expect(component.container).toHaveTextContent(`blog has ${blog.likes} likes`)
})

test('clicking like twice calls even handler twice', async () => {
  const blog = {
    title: 'blog title',
    author: 'blog author',
    likes: 0
  }

  const mockHandler = jest.fn()

  const { getByText } = render(<SimpleBlog blog={blog} onClick={mockHandler} />)

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
