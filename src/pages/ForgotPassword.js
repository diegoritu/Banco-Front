import React from 'react'
import Content from '../components/Content'
import Footer from '../components/Footer'
import GlobalContainer from '../components/GlobalContainer'
import Details from '../components/Details'
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

const ForgotPassword = () => {

  return (
    <GlobalContainer id='globalContainer'>
      <HeaderWrapper>
          <HeaderTitle to={{pathname: (sessionStorage.getItem('userType') === 'ADMINISTRATIVE' ? '/adminHome' : '/home')}}> 
            KRRL Bank
          </HeaderTitle>
      </HeaderWrapper>
      <Content id='content' direction='column' url='https://www.cdbeco.com.vn/wp-content/uploads/2019/02/326780-P9JGF8-718.jpg' collapse='xs'>
        <Details>
          <Text> ¿Olvidó su contraseña? </Text>        
        </Details>
        <Details>
          <h3>Para recuperarla debe ir a su sucursal más cercana y hablar con un representante del área comercial, o puede cambiarla llamando al 0800-333-KRRL(5775), marcando la opción de cambio de contraseña.</h3>
        </Details>
      </Content>
      <Footer id='footer' />
    </GlobalContainer>
  )
}

export default ForgotPassword
