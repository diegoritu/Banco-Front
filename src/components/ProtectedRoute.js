import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (window.sessionStorage.getItem('user') && (window.sessionStorage.getItem('userType') === 'PHYSICAL' || window.sessionStorage.getItem('userType') === 'LEGAL')
      ? <Component {...props} />
      : <Redirect to={{ pathname: (window.sessionStorage.getItem('user') ? '/adminHome' : '/'), state: { from: props.location } }} />)}
  />
)

export default ProtectedRoute
