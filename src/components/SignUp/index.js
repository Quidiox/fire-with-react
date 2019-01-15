import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'
import * as ROLES from '../../constants/roles'
import H1 from '../../styled-components/elements/H1'
import P from '../../styled-components/elements/P'
import INPUT from '../../styled-components/elements/INPUT'
import BUTTON from '../../styled-components/elements/BUTTON'
import LABEL from '../../styled-components/elements/LABEL'

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
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
    const { username, email, passwordOne, isAdmin } = this.state
    const roles = []
    if (isAdmin) roles.push(ROLES.ADMIN)
    console.log(roles)
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          roles
        })
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification()
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
  onChangeCheckbox = e => {
    this.setState({ [e.target.name]: e.target.checked })
  }
  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error
    } = this.state
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === ''
    return (
      <>
        <form onSubmit={this.onSubmit}>
          <LABEL>
            Username:
            <INPUT
              name="username"
              value={username}
              onChange={this.onChange}
              type="text"
              placeholder="Full Name"
            />
          </LABEL>
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
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
          </LABEL>
          <LABEL>
            Password confirmation:
            <INPUT
              name="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              type="password"
              placeholder="Confirm Password"
            />
          </LABEL>
          <LABEL>
            Admin:
            <INPUT
              name="isAdmin"
              type="checkbox"
              checked={isAdmin}
              onChange={this.onChangeCheckbox}
            />
          </LABEL>
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
