import React from 'react'
import Content from '../components/Content'
import Footer from '../components/Footer'
import GlobalContainer from '../components/GlobalContainer'
import Header from '../components/Header'
import AccountTable from '../components/AccountTable'
import Text from '../components/Text'
import DebitCard from '../components/DebitCard'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const ActionButton = styled.button`
  
  margin-top: 10px;
  margin-right: 5px;
  margin-left: 5px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #000;
  border: none;
  border-radius: 2px;
  font-size: 20px;
  color: #fff;
  width: auto;
  line-height: 38px;
  :active, :hover
  {
    background: #646464;
  }

`

const ButtonsContainer = styled.div`
  display: flex;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-evenly;
`

const Home = () => {
  const history = useHistory()
  const navigateToServicePay = () => history.push('/servicePay')
  const navigateToTransfer = () => history.push('/transfer')
  const createService = () => history.push('/createService')

  return (
    <GlobalContainer id='globalContainer'>
      <Header id='header' />
      <Content id='content' url='background.png' direction='column'>
        <Text> Acciones </Text>
        <ButtonsContainer>
          <ActionButton onClick={navigateToServicePay} type='button'> Pagar servicios </ActionButton>
          <ActionButton onClick={navigateToTransfer} type='button'> Realizar transferencia </ActionButton>
          {window.sessionStorage.getItem('userType') === 'LEGAL' && <ActionButton onClick={createService} type='button'> Crear servicio </ActionButton>}
        </ButtonsContainer>
        <Text> Mis Cuentas </Text>
        <AccountTable accountType='SAVINGS' />
        <AccountTable accountType='CHECKING' />
        {(window.sessionStorage.getItem('userType') === 'PHYSICAL') &&
          <>
            <Text> Tarjeta de débito </Text>
            <DebitCard />
          </>}
      </Content>
      <Footer id='footer' />
    </GlobalContainer>
  )
}

export default Home
