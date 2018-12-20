import React from 'react'
import { withFirebase } from '../Firebase'
import BUTTON from '../../styled-components/elements/BUTTON'

const SignOut = ({ firebase }) => (
  <BUTTON onClick={firebase.doSignOut}>Sign Out</BUTTON>
)

export default withFirebase(SignOut)
