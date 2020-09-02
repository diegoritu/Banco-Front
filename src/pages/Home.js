import React from 'react'

import Content from '../components/Content'
import Footer from '../components/Footer'
import GlobalContainer from '../components/GlobalContainer'
import Header from '../components/Header'

const Home = () => {
  return (
    <GlobalContainer id='globalContainer'>
      <Header id='header' />
      <Content id='content' />
      <p>Home</p>
      <Footer id='footer' />
    </GlobalContainer>
  )
}

export default Home
