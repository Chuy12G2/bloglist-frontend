import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Toggler from './components/Toggler'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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

  const handleLogin = async (person) => {
    try{
    const user = await loginService.login(person)
    window.localStorage.setItem(
      'loggedUser', JSON.stringify(user) 
    )

    blogService.setToken(user.token)
    setUser(user)
    }catch(exception){
      console.log(exception)
    }
  }

   const handleLogOut = () => {
    window.localStorage.clear()
     setUser(null)
   }

  const blogsRender = blogs.map(blog => {
    return( 
    <Blog blog={blog} key={blog.id}/>)
  })

  const handleCreateBlog = async (newObject) => {
    const newBlog = await blogService.create(newObject)
    setBlogs(blogs.concat(newBlog))
  }

  return (
    <div>
      <h1>Blog List App</h1>
      {!user && <Toggler label={'Login'}>
                  <LoginForm login={handleLogin}/>
                </Toggler>}
      
      {user &&  <div>
                  <h3>{user.name} has logged in</h3>
                  <button onClick={handleLogOut}>Log out</button>
                  <Toggler label={'New note'}>  
                    <BlogForm createBlog={handleCreateBlog}/>
                  </Toggler>
                  {blogsRender}
                </div>
      }
      
    </div>
    
  )
}

export default App