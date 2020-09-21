import React from 'react'
import styled from 'styled-components'
import Logout from './Logout'
import { Link } from 'react-router-dom'

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

const Header = () => {
  return (
    <HeaderWrapper>
        <HeaderTitle to={{pathname: (sessionStorage.getItem('userType') === 'ADMINISTRATIVE' ? '/adminHome' : '/home')}}> 
          KRRL Bank
        </HeaderTitle>
      <Logout title={'Bienvenido/a ' + sessionStorage.getItem('userName')} />
    </HeaderWrapper>
  )
}

export default Header
