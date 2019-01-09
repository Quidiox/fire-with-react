import React from 'react'
import { withAuthorization } from '../Session'
import H1 from '../../styled-components/elements/H1'
import P from '../../styled-components/elements/P'

const Home = () => (
  <div>
    <H1>Home Page</H1>
    <P>The Home Page is accessible by every signed in user.</P>
  </div>
)

const condition = authUser => !!authUser

export default withAuthorization(condition)(Home)
