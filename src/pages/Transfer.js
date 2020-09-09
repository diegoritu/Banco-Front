import React from 'react'
import Content from '../components/Content'
import Footer from '../components/Footer'
import GlobalContainer from '../components/GlobalContainer'
import Header from '../components/Header'
import Dropdown from '../components/Dropdown'

const items = [
  {
    id: 1,
    value: 'foo'
  },
  {
    id: 2,
    value: 'bar'
  }
]

const Transfer = () => {
  return (
    <GlobalContainer id='globalContainer'>
      <Header id='header' />
      <Content id='content' height='95vh' direction='column'>
        <p>Transfer</p>
        <Dropdown title='Select' items={items} />
      </Content>
      <Footer id='footer' />
    </GlobalContainer>
  )
}

export default Transfer
