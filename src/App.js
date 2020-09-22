import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import CBU from './pages/CBU'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import ProtectedRouteAdmin from './components/ProtectedRouteAdmin'
import NotProtectedRoute from './components/NotProtectedRoute'
import NotFound from './pages/NotFound'
import Transactions from './pages/Transactions'
import Transfer from './pages/Transfer'
import TransactionDetails from './pages/TransactionDetails'
import Deposit from './pages/Deposit'
import Extraction from './pages/Extraction'
import Password from './pages/Password'
import AdminHome from './pages/AdminHome'
import SearchClient from './pages/SearchClient'
import RegisterClient from './pages/RegisterClient'
import ClientDetails from './pages/ClientDetails'
import ServicePay from './pages/ServicePay'
import CreateService from './pages/CreateService'
import ForgotPassword from './pages/ForgotPassword'

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
        <NotProtectedRoute exact path='/' component={Login} />
        <ProtectedRoute exact path='/home' component={Home} />
        <ProtectedRoute exact path='/cbu' component={CBU} />
        <ProtectedRoute exact path='/transfer' component={Transfer} />
        <ProtectedRoute exact path='/transactions' component={Transactions} />
        <ProtectedRoute exact path='/transactionDetails' component={TransactionDetails} />
        <ProtectedRouteAdmin exact path='/deposit' component={Deposit} />
        <ProtectedRouteAdmin exact path='/extraction' component={Extraction} />
        <ProtectedRoute exact path='/password' component={Password} />
        <ProtectedRouteAdmin exact path='/adminHome' component={AdminHome} />
        <ProtectedRouteAdmin exact path='/searchClient' component={SearchClient} />
        <ProtectedRouteAdmin exact path='/registerClient' component={RegisterClient} />
        <ProtectedRouteAdmin exact path='/clientDetails' component={ClientDetails} />
        <ProtectedRoute exact path='/servicePay' component={ServicePay} />
        <ProtectedRouteAdmin exact path='/createService' component={CreateService} />
        <NotProtectedRoute exact path='/forgotPassword' component={ForgotPassword} />
        <Route path='*' component={NotFound} />
      </Switch>
    </ThemeProvider>
  )
}

export default App
