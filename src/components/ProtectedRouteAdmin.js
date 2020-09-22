import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (window.sessionStorage.getItem('user') && (window.sessionStorage.getItem('userType') === 'ADMINISTRATIVE')
      ? <Component {...props} />
      : <Redirect to={{ pathname: (window.sessionStorage.getItem('user') ? '/home' : '/'), state: { from: props.location } }} />)}
  />
)

export default ProtectedRoute
