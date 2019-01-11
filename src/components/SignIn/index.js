import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { SignUpLink } from '../SignUp'
import { PasswordForgetLink } from '../PasswordForget'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'
import H1 from '../../styled-components/elements/H1'
import P from '../../styled-components/elements/P'
import INPUT from '../../styled-components/elements/INPUT'
import BUTTON from '../../styled-components/elements/BUTTON'
import LABEL from '../../styled-components/elements/LABEL'

const SignIn = () => (
  <div>
    <H1>Sign In</H1>
    <SignInForm />
    <PasswordForgetLink />
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

  onSubmit = async e => {
    e.preventDefault()
    const { email, password } = this.state
    try {
      await this.props.firebase.doSignInWithEmailAndPassword(email, password)
      this.setState({ ...INITIAL_STATE })
      this.props.history.push(ROUTES.HOME)
    } catch (error) {
      this.setState({ error })
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { email, password, error } = this.state
    const isInvalid = password === '' || email === ''
    return (
      <form onSubmit={this.onSubmit}>
        <LABEL>
          Email:
          <INPUT
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
        </LABEL>
        <LABEL>
          Password:
          <INPUT
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
        </LABEL>
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
