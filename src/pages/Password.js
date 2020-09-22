import React from 'react'
import Column from '../components/Column'
import Content from '../components/Content'
import GlobalContainer from '../components/GlobalContainer'
import PasswordForm from '../components/PasswordForm'
import Welcome from '../components/Welcome'

const Password = (props) => {
  if(!props.history.location.state){
    props.history.push('/home')
  }

  return (
    <GlobalContainer>
      <Content id='content' role='main' url='https://www.cdbeco.com.vn/wp-content/uploads/2019/02/326780-P9JGF8-718.jpg' collapse='xs'>
        <Column size={8} collapse='xs' />
        <Column size={5}>
          <Welcome />
          <PasswordForm />
        </Column>
      </Content>
    </GlobalContainer>
  )
}

export default Password
