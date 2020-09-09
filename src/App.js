import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import CBU from './pages/CBU'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './pages/NotFound'
import Transactions from './pages/Transactions'
import Transfer from './pages/Transfer'
import TransactionDetails from './pages/TransactionDetails'

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
        <ProtectedRoute exact path='/cbu' component={CBU} />
        <ProtectedRoute exact path='/transfer' component={Transfer} />
        <ProtectedRoute exact path='/transactions' component={Transactions} />
        <ProtectedRoute exact path='/transactionDetails' component={TransactionDetails} />
        <Route path='*' component={NotFound} />
      </Switch>
    </ThemeProvider>
  )
}

export default App
