import React from 'react'
import AuthUserContext from './context'
import { withFirebase } from '../Firebase'

const withEmailVerification = Component => {
  class WithEmailVerification extends React.Component {
    state = { isSend: false }
    onSendEmailVerification = () => {
      this.props.firebase
        .doSendEmailVerification()
        .then(() => this.setState({ isSent: true }))
    }
    render() {
      const { isSent } = this.state
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            needsEmailVerification(authUser) ? (
              <div>
                {isSent ? (
                  <p>
                    E-Mail confirmation sent: Check you E-Mails (Spam folder
                    included) for a confirmation E-Mail. Refresh this page once
                    you confirmed your E-Mail.
                  </p>
                ) : (
                  <p>
                    Verify your E-Mail: Check you E-Mails (Spam folder included)
                    for a confirmation E-Mail or send another confirmation
                    E-Mail.
                  </p>
                )}
                <button
                  type="button"
                  onClick={this.onSendEmailVerification}
                  disabled={isSent}
                >
                  Send confirmation E-Mail
                </button>
              </div>
            ) : (
              <Component {...this.props} />
            )
          }
        </AuthUserContext.Consumer>
      )
    }
  }
  return withFirebase(WithEmailVerification)
}

const needsEmailVerification = authUser =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map(provider => provider.providerId)
    .includes('password')

export default withEmailVerification
