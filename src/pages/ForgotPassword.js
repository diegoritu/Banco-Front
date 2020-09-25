import React from 'react'
import Content from '../components/Content'
import Footer from '../components/Footer'
import GlobalContainer from '../components/GlobalContainer'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Text = styled.h1`
  margin: 0px;
  width: 60%;
`

const HeaderWrapper = styled.header`
  display: flex;
  width: 100%;
  height: 5vh;
  background: #000;
  justify-content: space-between;
  flex-wrap: wrap;
  min-height: 40px;
`

const HeaderTitle = styled(Link)`
  color: #FFF;
  padding: 10px;
  align-self:center;
  text-decoration: none;
`
const DetailsWhite = styled.div`
  width: 60%;
  margin-top: 2%;
  margin-bottom: 2%;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #fff;

`
const ForgotPassword = () => {

  return (
    <GlobalContainer id='globalContainer'>
      <HeaderWrapper>
          <HeaderTitle to={{pathname: (sessionStorage.getItem('userType') === 'ADMINISTRATIVE' ? '/adminHome' : '/home')}}> 
            KRRL Bank
          </HeaderTitle>
      </HeaderWrapper>
      <Content id='content'url="background.png" direction='column' url='https://www.cdbeco.com.vn/wp-content/uploads/2019/02/326780-P9JGF8-718.jpg' collapse='xs'>
        <DetailsWhite>
          <Text> ¿Olvidó su contraseña? </Text>        
        </DetailsWhite>
        <DetailsWhite>
          <h3>Para recuperarla debe ir a su sucursal más cercana y hablar con un representante del área comercial, o puede cambiarla llamando al 0800-333-KRRL(5775), marcando la opción de cambio de contraseña.</h3>
        </DetailsWhite>
      </Content>
      <Footer id='footer' />
    </GlobalContainer>
  )
}

export default ForgotPassword
