import React, { useState } from 'react'

const Blog = ({ blog, increaseLikes, remove, user }) => {
  const [visible, setVisible] = useState(false)
  const showDetails = { display: visible ? '' : 'none' }
  const showRemove = {
    display: blog.user.username === user.username ? '' : 'none'
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className="blog" style={blogStyle}>
      <div className="info" onClick={() => setVisible(!visible)}>
        {blog.title} {blog.author}
      </div>
      <div className="details" style={showDetails}>
        <div>{blog.url}</div>
        <div>
          {blog.likes} likes <button onClick={increaseLikes}>like</button>
        </div>
        <div>added by {blog.user.name}</div>
        <button style={showRemove} onClick={remove}>
          remove
        </button>
      </div>
    </div>
  )
}

export default Blog
