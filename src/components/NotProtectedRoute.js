import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (!window.sessionStorage.getItem('user')
      ? <Component {...props} />
      : <Redirect to={{ pathname: (window.sessionStorage.getItem('userType' === 'ADMINISTRATIVE') ? '/adminHome' : '/home'), state: { from: props.location } }} />)}
  />
)

export default ProtectedRoute
