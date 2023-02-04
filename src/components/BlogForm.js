import { useState } from "react"

const NoteForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const newBlog = {
    title,
    author, 
    url,
    likes
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog(newBlog)
  }

  return(
    <form onSubmit={handleSubmit}>
    <p>Add New Note</p>
    <div>
    Title
    <input
      type='text'
      value={title}
      name='title'
      onChange={(event) => setTitle(event.target.value)}
    />
    </div>
    <div>
    Author
    <input
      type='text'
      value={author}
      name='author'
      onChange={(event) => setAuthor(event.target.value)}
    />
    </div>
    <div>
    Url
    <input
      type='text'
      value={url}
      name='url'
      onChange={(event) => setUrl(event.target.value)}
    />
    </div>
    <div>
    Likes
    <input
      type='text'
      value={likes}
      name='likes'
      onChange={(event) => setLikes(event.target.value)}
    />
    </div>
    <button type='submit'>Create</button>
    
  </form>
  )
}

export default NoteForm