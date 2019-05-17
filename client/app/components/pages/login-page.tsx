import React, {
  FunctionComponent,
  ReactElement,
  useState,
  SyntheticEvent
} from 'react'

export const LoginPage: FunctionComponent = (): ReactElement => {
  const defaultState = { username: '', password: '' }
  const [credentials, updateCredentials] = useState(defaultState)

  const { username, password } = credentials

  const handleChange = (e: SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement
    const newState = { ...credentials, [name]: value }
    updateCredentials(newState)
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    console.log('submitting with: ', credentials)
  }

  return (
    <div>
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="text"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
