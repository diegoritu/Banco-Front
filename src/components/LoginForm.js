import React from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-basis: 70%;
  justify-content: center;
`

const Input = styled.input`

`

const SubmitButton = styled.input`
background-color: #1877f2;
border: none;
border-radius: 6px;
font-size: 20px;
line-height: 48px;
padding: 0 16px;
width: 100px;

`

const LoginForm = () => {
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input name='username' type='text' placeholder='Usuario' ref={register({ required: true, minLength: 3 })} />
      {errors.username && <p>Username is invalid</p>}
      <Input name='password' type='password' placeholder='Contraseña' ref={register({ required: true, minLength: 8 })} />
      {errors.password && <p>Password is invalid</p>}
      <SubmitButton type='submit' value='Ingresar' />
    </Form>
  )
}
export default LoginForm
