import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs.sort((a, b) => b.likes - a.likes))
    })
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const resetBlogForm = () => {
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }

  const clearMessages = () => {
    setTimeout(() => {
      setErrorMessage(null)
      setMessage(null)
    }, 5000)
  }

  const handleAuthorChange = event => setNewAuthor(event.target.value)
  const handleTitleChange = event => setNewTitle(event.target.value)
  const handleUrlChange = event => setNewUrl(event.target.value)

  const addBlog = event => {
    event.preventDefault()
    const blog = {
      author: newAuthor,
      title: newTitle,
      url: newUrl
    }
    blogService.create(blog).then(returnedBlog => {
      setMessage(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      )
      setBlogs(blogs.concat(returnedBlog))
      resetBlogForm()
      clearMessages()
    })
  }

  const removeBlog = blog => async () => {
    const result = window.confirm(`remove ${blog.name} by ${blog.author}?`)

    if (result) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  const increaseLikes = blog => async () => {
    const updatedBlog = await blogService.increaseLikes(blog)
    setBlogs(
      blogs
        .map(b => (b.id === updatedBlog.id ? updatedBlog : b))
        .sort((a, b) => b.likes - a.likes)
    )
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      clearMessages()
    }
  }

  const logout = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} messageType="error" />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} messageType="success" />
      <p>
        {user.name} logged in <button onClick={logout}>logout</button>
      </p>
      <Togglable buttonLabel="new blog">
        <BlogForm
          handleAuthorChange={handleAuthorChange}
          handleTitleChange={handleTitleChange}
          handleUrlChange={handleUrlChange}
          author={newAuthor}
          title={newTitle}
          url={newUrl}
          addBlog={addBlog}
        />
      </Togglable>
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          increaseLikes={increaseLikes(blog)}
          remove={removeBlog(blog)}
          user={user}
        />
      ))}
    </div>
  )
}

export default App
