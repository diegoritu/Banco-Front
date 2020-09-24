import React from 'react'
import Content from '../components/Content'
import Footer from '../components/Footer'
import GlobalContainer from '../components/GlobalContainer'
import Header from '../components/Header'
import Text from '../components/Text'
import Details from '../components/Details'
import { userService } from '../services/userService'
import { accountService } from '../services/accountService'

const getUser = () => {
  return userService.user(sessionStorage.getItem('userType'))
}

const getAccount = (accountType) => {
  return accountService.account(accountType)
}

const CBU = (props) => {
  var accountType = 'SAVINGS'
  if(props.history.location.state.account === sessionStorage.getItem('userChecking')){
    accountType = 'CHECKING'
  }
  const [userData, setUser] = React.useState([])
  const [accountData, setAccount] = React.useState([])

  React.useEffect(() => {
    getUser().then(userData => setUser(userData))
    getAccount(accountType).then(accountData => setAccount(accountData))

  }, [])
  return (
    <GlobalContainer id='globalContainer'>
      <Header id='header' />
      <Content id='content' url="background.png" direction='column'>
        <Text> Cuentas {'>>'} CBU </Text>
        <Details>
          <h4> Tipo de cuenta: {(accountType === 'CHECKING' ? 'Cuenta corrinete' : 'Caja de ahorro')} </h4>
          <h4> Número de cuenta: {accountData.accountNumber} </h4>
          <h4> CBU: {accountData.cbu} </h4>
          <h4> Titular: {sessionStorage.getItem('userName')}</h4>
          {(sessionStorage.getItem('userType') === 'PHYSICAL') ? (<h4> Documento: {userData.dni} </h4>) : '' }
          <h4> CUIT/CUIL/CDI: {userData.cuitCuilCdi} </h4>
        </Details>
      </Content>
      <Footer id='footer' />
    </GlobalContainer>
  )
}

export default CBU
