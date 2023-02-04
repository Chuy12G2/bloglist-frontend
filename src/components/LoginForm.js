import { useState } from "react"

const LoginForm = ( {login} ) => {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const person = {
    username,
    password
  }

  const handleLogin = (event) => {
    event.preventDefault()
    login(person)
    setPassword('')
    setPassword('')
  }

  return (
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
}

export default LoginForm