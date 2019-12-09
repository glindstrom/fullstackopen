import React from 'react'

const BlogForm = props => {
  return (
    <form onSubmit={props.addBlog}>
      <div>
        title: <input onChange={props.handleTitleChange} value={props.title} />
      </div>
      <div>
        author:
        <input onChange={props.handleAuthorChange} value={props.author} />
      </div>
      <div>
        url:
        <input onChange={props.handleUrlChange} value={props.url} />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  )
}

export default BlogForm
