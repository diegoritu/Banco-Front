import React from 'react'
import Content from '../components/Content'
import Footer from '../components/Footer'
import GlobalContainer from '../components/GlobalContainer'
import Header from '../components/Header'
import AccountTable from '../components/AccountTable'
import Text from '../components/Text'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'


const PayButton = styled.button`
  
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 20%;
  margin-right: auto;
  background-color: #000;
  border: none;
  border-radius: 2px;
  font-size: 20px;
  color: #fff;
  line-height: 48px;
  :active, :hover
  {
    background: #646464;
  }

`


const Home = () => {
  const history = useHistory()
  const navigateToServicePay = () => history.push('/servicePay')

  return (
    <GlobalContainer id='globalContainer'>
      <Header id='header' />
      <Content id='content' url="background.png" direction='column'>
        <Text> Acciones </Text>
        <PayButton onClick={navigateToServicePay} type="button"> Pagar Servicios </PayButton>
        <Text> Mis Cuentas </Text>
        <AccountTable accountType={'SAVINGS'} />
        <AccountTable accountType={'CHECKING'} />
      </Content>
      <Footer id='footer' />
    </GlobalContainer>
  )
}

export default Home
