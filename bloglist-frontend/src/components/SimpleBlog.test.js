import React from 'react'
import { render, cleanup } from '@testing-library/react'
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
