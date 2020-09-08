import React from 'react'

import Content from '../components/Content'
import Footer from '../components/Footer'
import GlobalContainer from '../components/GlobalContainer'
import Header from '../components/Header'
import AccountTable from '../components/AccountTable'
import Text from '../components/Text'
import Button from '../components/Button'

const Home = () => {
  return (
    <GlobalContainer id='globalContainer'>
      <Header id='header' />
      <Content id='content' height='95vh' direction='column'>
        <Text> Acciones </Text>
        <Button> Pagar Servicios </Button>
        <Text> Mis Cuentas </Text>
        <AccountTable />
        <AccountTable />
      </Content>
      <Footer id='footer' />
    </GlobalContainer>
  )
}

export default Home
