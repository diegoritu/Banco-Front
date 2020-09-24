import React from 'react'
import Content from '../components/Content'
import Footer from '../components/Footer'
import GlobalContainer from '../components/GlobalContainer'
import Header from '../components/Header'
import AccountTable from '../components/AccountTable'
import Text from '../components/Text'
import Button from '../components/Button'
import { useHistory } from 'react-router-dom';




const Home = () => {
  const history = useHistory()
  const navigateToServicePay = () => history.push('/servicePay')

  return (
    <GlobalContainer id='globalContainer'>
      <Header id='header' />
      <Content id='content' url="background.png" direction='column'>
        <Text> Acciones </Text>
        <Button onClick={navigateToServicePay} type="button"> Pagar Servicios </Button>
        <Text> Mis Cuentas </Text>
        <AccountTable accountType={'SAVINGS'} />
        <AccountTable accountType={'CHECKING'} />
      </Content>
      <Footer id='footer' />
    </GlobalContainer>
  )
}

export default Home
