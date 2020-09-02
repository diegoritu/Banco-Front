import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './pages/NotFound'

const theme = {
  font: 'Calibri',
  colors: {
    primary: 'blue',
    secondary: 'white'
  }
}

function App () {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path='/' component={Login} />
        <ProtectedRoute exact path='/home' component={Home} />
        <Route path='*' component={NotFound} />
      </Switch>
    </ThemeProvider>
  )
}

export default App
