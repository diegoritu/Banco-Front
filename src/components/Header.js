import React from 'react'
import styled from 'styled-components'
import Logout from './Logout'
import { useHistory } from 'react-router-dom';

const HeaderWrapper = styled.header`
  display: flex;
  width: 100%;
  height: 5vh;
  background: #000;
  justify-content: space-between;
  flex-wrap: wrap;
  min-height: 40px;
`

const HeaderTitle = styled.span`
  color: #FFF;
  padding: 10px;
  align-self:center;
`

const Header = () => {
  const history = useHistory()
  const navigateToHome = () => (sessionStorage.getItem('userType') === 'ADMINISTRATIVE' ? history.push('/adminHome') : history.push('/home'))

  return (
    <HeaderWrapper>
      <HeaderTitle onClick={navigateToHome}>
        KRRL Bank
      </HeaderTitle>
      <Logout title={'Bienvenido/a ' + sessionStorage.getItem('userName')} />
    </HeaderWrapper>
  )
}

export default Header
