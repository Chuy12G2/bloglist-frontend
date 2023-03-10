import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Toggler from './components/Toggler'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [reRender, setReRender] = useState(true)
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [reRender])

  

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if(loggedUserJSON){
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const BlogFormRef = useRef()

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

  const deleteBlog = async (e) => {
    blogService.remove(e.id)
    setReRender(!reRender)
  }

  const updateBlog = async (blog) => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    await blogService.update(blog.id, updatedBlog)

    setReRender(!reRender)
  }

  const blogsRender = blogs.map(blog => {
    return( 
    <Blog blog={blog} handleDelete={deleteBlog} currentUser={user} handleLike={updateBlog} key={blog.id}/>)
  })

  const handleCreateBlog = async (newObject) => {
    const newBlog = await blogService.create(newObject)
    setBlogs(blogs.concat(newBlog))
    BlogFormRef.current.changeVisibility()
    setReRender(!reRender)
  }

  console.log('rendering')
  
  return (
    <div>
      <h1>Blog List App</h1>
      {!user && <Toggler label={'Login'}>
                  <LoginForm login={handleLogin}/>
                </Toggler>}
      
      {user &&  <div>
                  <h2>{user.name} has logged in</h2>
                  <button onClick={handleLogOut}>Log out</button>
                  <Toggler label={'New note'} ref={BlogFormRef}>  
                    <BlogForm createBlog={handleCreateBlog}/>
                  </Toggler> 
                  {blogsRender}
                </div>
      }
      
    </div>
    
  )
}

export default App