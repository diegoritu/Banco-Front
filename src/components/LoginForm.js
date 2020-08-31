import React from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-basis: 70%;
  justify-content: center;
  align-items: center;
`

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  width: 100%;

`

const SubmitButton = styled.input`
background-color: #1877f2;
border: none;
border-radius: 6px;
font-size: 20px;
color: #fff;
line-height: 48px;
padding: 0 16px;
width: 80%;
margin-top: 10px;

`
const ErrorMsg = styled.span`
  color: red;
  font-size: 12px;
  margin-top: -5px;
  align-self: flex-start;

`

const LoginForm = () => {
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input name='username' type='text' placeholder='Usuario' ref={register({ required: true, minLength: 3 })} />
      {errors.username && <ErrorMsg>Username is invalid</ErrorMsg>}
      <Input name='password' type='password' placeholder='Contraseña' ref={register({ required: true, minLength: 8 })} />
      {errors.password && <ErrorMsg>Password is invalid</ErrorMsg>}
      <SubmitButton type='submit' value='Ingresar' />
    </Form>
  )
}
export default LoginForm
