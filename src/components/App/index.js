import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Navigation from '../Navigation'
import Landing from '../Landing'
import SignUp from '../SignUp'
import SignIn from '../SignIn'
import Home from '../Home'
import PasswordChange from '../PasswordChange'
import PasswordForget from '../PasswordForget'
import SignOut from '../SignOut'
import Admin from '../Admin'
import Account from '../Account'
import * as ROUTES from '../../constants/routes'

const App = () => (
  <BrowserRouter>
    <div>
      <Navigation />
      <hr />
      <Route exact path={ROUTES.LANDING} component={Landing} />
      <Route path={ROUTES.SIGN_UP} component={SignUp} />
      <Route path={ROUTES.SIGN_IN} component={SignIn} />
      <Route path={ROUTES.SIGN_OUT} component={SignOut} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
      <Route path={ROUTES.PASSWORD_CHANGE} component={PasswordChange} />
      <Route path={ROUTES.HOME} component={Home} />
      <Route path={ROUTES.ACCOUNT} component={Account} />
      <Route path={ROUTES.ADMIN} component={Admin} />
    </div>
  </BrowserRouter>
)

export default App
