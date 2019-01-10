import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'
import H1 from '../../styled-components/elements/H1'
import P from '../../styled-components/elements/P'
import INPUT from '../../styled-components/elements/INPUT'
import BUTTON from '../../styled-components/elements/BUTTON'

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
}

const SignUp = () => (
  <>
    <H1>Sign Up</H1>
    <SignUpForm />
  </>
)

class SignUpFormBase extends React.Component {
  state = {
    ...INITIAL_STATE
  }
  onSubmit = e => {
    e.preventDefault()
    const { username, email, passwordOne } = this.state
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email
        })
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE })
        this.props.history.push(ROUTES.HOME)
      })
      .catch(error => {
        this.setState({ error })
      })
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === ''
    return (
      <>
        <form onSubmit={this.onSubmit}>
          <INPUT
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Full Name"
          />
          <INPUT
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <INPUT
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <INPUT
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
          />
          <BUTTON disabled={isInvalid} type="submit">
            Sign Up
          </BUTTON>

          {error && <P>{error.message}</P>}
        </form>
      </>
    )
  }
}

const SignUpLink = () => <Link to={ROUTES.SIGN_UP}>Sign Up</Link>

export default SignUp

const SignUpForm = withRouter(withFirebase(SignUpFormBase))

export { SignUpLink, SignUpForm }
