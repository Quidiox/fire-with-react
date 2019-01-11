import React from 'react'
import AuthUserContext from './context'
import { withFirebase } from '../Firebase'

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    state = {
      authUser: null
    }
    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          this.setState({ authUser })
        },
        () => {
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
