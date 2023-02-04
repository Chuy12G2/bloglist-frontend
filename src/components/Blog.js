import { useState } from "react"

const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return(

  <div>
    { !visible &&
    <div style={blogStyle}>
      <h3 style={{display: 'inline', paddingRight: '10px'}}>{blog.title} -- {blog.author}</h3>
      <button onClick={toggleVisibility}>view</button>
    </div>
    }
    { visible &&
    <div style={blogStyle}>
      <p style={{display: 'inline', paddingRight: '10px'}}>{blog.title} -- {blog.author}</p>
      <button onClick={toggleVisibility}>Hide</button>
      <p>{blog.url}</p>
      <p style={{display: 'inline', paddingRight: '10px'}}>likes {blog.likes}</p>
      <button>like</button>
      <p>{blog.user.name}</p>
      
    </div>
    }
  </div> 
    
  ) 
}

export default Blog