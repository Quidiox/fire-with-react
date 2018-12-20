import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { SignUpLink } from '../SignUp'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'
import H1 from '../../styled-components/elements/H1'
import P from '../../styled-components/elements/P'
import INPUT from '../../styled-components/elements/INPUT'
import BUTTON from '../../styled-components/elements/BUTTON'

const SignIn = () => (
  <div>
    <H1>Sign In</H1>
    <SignInForm />
    <SignUpLink />
  </div>
)

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}

class SignInFormBase extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    const { email, password } = this.state

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
        this.props.history.push(ROUTES.HOME)
      })
      .catch(error => {
        this.setState({ error })
      })

    event.preventDefault()
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { email, password, error } = this.state

    const isInvalid = password === '' || email === ''

    return (
      <form onSubmit={this.onSubmit}>
        <INPUT
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <INPUT
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <BUTTON disabled={isInvalid} type="submit">
          Sign In
        </BUTTON>

        {error && <P>{error.message}</P>}
      </form>
    )
  }
}

const SignInForm = withRouter(withFirebase(SignInFormBase))

export default SignIn

export { SignInForm }
