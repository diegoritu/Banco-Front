import React from 'react'
import Content from '../components/Content'
import Footer from '../components/Footer'
import GlobalContainer from '../components/GlobalContainer'
import Header from '../components/Header'

const Transfer = () => {
  return (
    <GlobalContainer id='globalContainer'>
      <Header id='header' />
      <Content id='content' height='95vh' direction='column'>
        <p>Transfer</p>
      </Content>
      <Footer id='footer' />
    </GlobalContainer>
  )
}

export default Transfer
