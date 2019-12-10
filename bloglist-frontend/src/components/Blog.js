import React, { useState } from 'react'

const Blog = ({ blog, increaseLikes }) => {
  const [visible, setVisible] = useState(false)
  const showDetails = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div onClick={() => setVisible(!visible)}>
        {blog.title} {blog.author}
      </div>
      <div style={showDetails}>
        <div>{blog.url}</div>
        <div>
          {blog.likes} likes <button onClick={increaseLikes}>like</button>
        </div>
        <div>added by {blog.user.name}</div>
      </div>
    </div>
  )
}

export default Blog
