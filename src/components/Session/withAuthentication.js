import React from 'react'
import AuthUserContext from './context'
import { withFirebase } from '../Firebase'

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    state = {
      authUser: JSON.parse(localStorage.getItem('reactWithFireToken'))
    }
    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          localStorage.setItem('reactWithFireToken', JSON.stringify(authUser))
          this.setState({ authUser })
        },
        () => {
          localStorage.removeItem('reactWithFireToken')
          this.setState({ authUser: null })
        }
      )
    }
    componentWillUnmount() {
      this.listener()
    }
    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      )
    }
  }

  return withFirebase(WithAuthentication)
}

export default withAuthentication
