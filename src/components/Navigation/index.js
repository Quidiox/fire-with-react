import React from 'react'
import { Link } from 'react-router-dom'
import SignOut from '../SignOut'
import * as ROUTES from '../../constants/routes'
import * as ROLES from '../../constants/roles'
import UL from '../../styled-components/elements/UL'
import LI from '../../styled-components/elements/LI'
import { AuthUserContext } from '../Session'

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>
)

const NavigationAuth = ({ authUser }) => (
  <UL>
    <LI>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </LI>
    <LI>
      <Link to={ROUTES.HOME}>Home</Link>
    </LI>
    <LI>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </LI>
    {authUser.roles.includes(ROLES.ADMIN) && (
      <LI>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </LI>
    )}
    <LI>
      <SignOut />
    </LI>
  </UL>
)

const NavigationNonAuth = () => (
  <UL>
    <LI>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </LI>
    <LI>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </LI>
    <LI>
      <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </LI>
  </UL>
)

export default Navigation
