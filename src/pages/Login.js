import React from 'react'

import Column from '../components/Column'
import Content from '../components/Content'
import GlobalContainer from '../components/GlobalContainer'
import LoginForm from '../components/LoginForm'
import Recovery from '../components/Recovery'
import Welcome from '../components/Welcome'

const Login = () => {
  return (
    <GlobalContainer>
      <Content id='content' role='main' url='https://www.cdbeco.com.vn/wp-content/uploads/2019/02/326780-P9JGF8-718.jpg' collapse='xs'>
        <Column size={8} collapse='xs' />
        <Column size={5}>
          <Welcome />
          <LoginForm />
          <Recovery />
        </Column>
      </Content>
    </GlobalContainer>
  )
}

export default Login
