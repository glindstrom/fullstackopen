import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('text')
  const username = useField('text')
  const password = useField('password')

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
    newAuthor.reset()
    newTitle.reset()
    newUrl.reset()
  }

  const clearMessages = () => {
    setTimeout(() => {
      setErrorMessage(null)
      setMessage(null)
    }, 5000)
  }

  const addBlog = event => {
    event.preventDefault()
    const blog = {
      author: newAuthor.value,
      title: newTitle.value,
      url: newUrl.value
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

  const inputProperties = obj => {
    const resetProperty = 'reset'
    const { [resetProperty]: _, ...result } = obj
    return result
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
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
            <input {...inputProperties(username)} />
          </div>
          <div>
            password
            <input {...inputProperties(password)} />
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
          author={inputProperties(newAuthor)}
          title={inputProperties(newTitle)}
          url={inputProperties(newUrl)}
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
