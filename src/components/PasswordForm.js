import React from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { withRouter } from 'react-router-dom'
import ErrorMsg from './ErrorMsg'
import { userService } from '../services/userService'
import { useState } from 'react'
import { useAlert } from 'react-alert'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-basis: 40%;
  justify-content: center;
  align-items: center;
`

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  width: 75%;
`

const SubmitButton = styled.input`
  background-color: #1877f2;
  border: none;
  border-radius: 6px;
  font-size: 20px;
  color: #fff;
  line-height: 48px;
  padding: 0 16px;
  width: 40%;
  margin-top: 10px;
  @media only screen and (max-width: 880px) {
    width: 60%;
  }

`
const Message = styled.p`
  padding: 10px;
`

const PasswordForm = props => {
  const { register, handleSubmit, errors } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const alert = useAlert()

  const onSubmit = (data) => {
    setIsLoading(true)
    if(data.password !== data.repeatPassword) {
      alert.error('Ambos campos de contraseña deben ser iguales. Por favor verifique nuevamente.')
    }
    else {
      userService.changePassword(data)
        .then(
          response => {
            const { from } = props.location.state || { from: { pathname: response } }          
            console.log(from)  
            props.history.push(from)
          }
        )
        .catch(error => {
          console.log(error)
          setIsLoading(false)
        })
    }

  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Message> Su contraseña ha vencido, a continuacion ingrese una nueva:  </Message>
      <Input name='password' type='password' placeholder='Nueva contraseña' ref={register({ required: true })} />
      {errors.username && <ErrorMsg> x </ErrorMsg>}
      <Input name='repeatPassword' type='password' placeholder='Repita la contraseña' ref={register({ required: true})} />
      {errors.repeatPassword && <ErrorMsg> x </ErrorMsg>}
      <SubmitButton type='submit' value='Confirmar' disabled={isLoading} />
    </Form>
  )
}
export default withRouter(PasswordForm)
