import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if(loggedUserJSON){
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
    const user = await loginService.login({
      username, password
    })

    window.localStorage.setItem(
      'loggedUser', JSON.stringify(user) 
    )

    blogService.setToken(user.token)
    setUser(user)
    setPassword('')
    setUsername('')
    }catch(exception){
      console.log(exception)
    }
  }

  const handleLogOut = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    const newBlog = await blogService.create({
      title,
      author,
      url,
      likes
    })

    setBlogs(blogs.concat(newBlog))
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <p>Username</p>
        <input
        type='text'
        value={username}
        name='Username'
        onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <p>Password</p>
        <input
        type='text'
        value={password}
        name='Password'
        onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const addNoteForm = () => (
    <form onSubmit={handleCreateBlog}>
      <p>Add New Note</p>
      <div>
      Title
      <input
        type='text'
        value={title}
        name='Password'
        onChange={({ target }) => setTitle(target.value)}
      />
      </div>
      <div>
      Author
      <input
        type='text'
        value={author}
        name='Password'
        onChange={({ target }) => setAuthor(target.value)}
      />
      </div>
      <div>
      Url
      <input
        type='text'
        value={url}
        name='Password'
        onChange={({ target }) => setUrl(target.value)}
      />
      </div>
      <div>
      Likes
      <input
        type='text'
        value={likes}
        name='Password'
        onChange={({ target }) => setLikes(target.value)}
      />
      </div>
      <button type='submit'>Create</button>
      
    </form>
  )

  const renderIfUserIsLogged = () => (
    <div>
      <div>
        <h3>{user.name} has logged in</h3>
        <button onClick={handleLogOut}>Log out</button>
      </div>
      {addNoteForm()}
      <div>
        {user && <h2>blogs</h2>}
        {user && blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>

  )

  return (
    <div>
        {!user && loginForm()}
        {user && renderIfUserIsLogged()}
    </div>
    
  )
}

export default App