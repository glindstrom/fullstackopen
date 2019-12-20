import React from 'react'

const BlogForm = props => {
  return (
    <form onSubmit={props.addBlog}>
      <div>
        title: <input {...props.title} />
      </div>
      <div>
        author:
        <input {...props.author} />
      </div>
      <div>
        url:
        <input {...props.url} />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  )
}

export default BlogForm
