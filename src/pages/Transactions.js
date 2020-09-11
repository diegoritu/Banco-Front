import React from 'react'
import Content from '../components/Content'
import Footer from '../components/Footer'
import GlobalContainer from '../components/GlobalContainer'
import Header from '../components/Header'
import Text from '../components/Text'

const Transactions = () => {
  return (
    <GlobalContainer id='globalContainer'>
      <Header id='header' />
      <Content id='content' direction='column'>
        <Text> Detalle de cuenta </Text>
        <Text> Ultimos movimientos </Text>
      </Content>
      <Footer id='footer' />
    </GlobalContainer>
  )
}

export default Transactions
