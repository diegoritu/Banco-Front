import React, { useState } from 'react'
import Content from '../components/Content'
import Footer from '../components/Footer'
import GlobalContainer from '../components/GlobalContainer'
import Header from '../components/Header'
import { useForm } from 'react-hook-form'
import Text from '../components/Text'
import styled from 'styled-components'
import ErrorMsg from '../components/ErrorMsg'
import { Table, TButton, TableDataL, TableDataR, Caption } from '../components/Table'

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  width: 20vw;
`

const ToggleWrapper = styled.div`
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
`

const Button = styled.button`
  width: 50%;
  padding: 10px;
`
const FixBar = styled.div`
 height: 10vh;
  width: 100%;
`

const RegisterClient = props => {
  const { register, handleSubmit, errors } = useForm()
  const [isLegal, setIsLegal] = useState(false)

  const onSubmitNotLegal = (data) => {
    console.log(data)
  }
  const onSubmitLegal = (data) => {
    console.log(data)
  }
  return (
    <GlobalContainer id='globalContainer'>
      <Header id='header' />
      <Content id='content' direction='column'>
        <Text> Registro de nueva persona </Text>
        <ToggleWrapper>
          <Button onClick={() => setIsLegal(false)}> Fisica </Button>
          <Button onClick={() => setIsLegal(true)}> Juridica </Button>
        </ToggleWrapper>

        {!isLegal &&
          <form onSubmit={handleSubmit(onSubmitNotLegal)}>
            <Table>
              <Caption> Registrar cliente </Caption>
              <tbody>
                <tr>
                  <TableDataL> Nombre y Apellido </TableDataL>
                  <TableDataR>
                    <Input name='fullname' type='text' ref={register({ required: true, pattern: /^[A-Z][a-z]+(?:[ -][A-Z][a-z]+)*$/ })} />
                    {errors.fullname && <ErrorMsg> Invalido </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> CUIT/CUIL </TableDataL>
                  <TableDataR><Input name='cuitCuilNL' type='number' min='0' step='any' ref={register({ required: true })} /></TableDataR>
                </tr>
                <tr>
                  <TableDataL> DNI </TableDataL>
                  <TableDataR>
                    <Input name='dni' type='number' step='any' ref={register({ required: true, min: 0 })} />
                    {errors.dni && <ErrorMsg> Invalido </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Nombre de Usuario </TableDataL>
                  <TableDataR><Input name='usernameNL' type='text' ref={register({ required: true })} /></TableDataR>
                </tr>
                <tr>
                  <TableDataL> Domicilio </TableDataL>
                  <TableDataR><Input name='addressNL' type='text' ref={register({ required: true })} /></TableDataR>
                </tr>
                <tr>
                  <TableDataL> Fecha de nacimiento </TableDataL>
                  <TableDataR><Input name='birthday' type='date' ref={register({ required: true, min: '1900-01-01', max: '2100-01-01' })} /> {errors.birthday && <ErrorMsg> Invalido </ErrorMsg>}</TableDataR>
                </tr>
                <tr>
                  <TableDataL> Telefono </TableDataL>
                  <TableDataR><Input name='phoneNL' type='number' step='any' ref={register({ required: true, min: 0 })} /></TableDataR>
                </tr>
                <tr>
                  <TableDataL> Celular </TableDataL>
                  <TableDataR><Input name='mobileNL' type='number' step='any' ref={register({ required: true, min: 0 })} /></TableDataR>
                </tr>
                <tr>
                  <TableDataL> Cuenta Corriente </TableDataL>
                  <TableDataR><Input name='checkingNL' type='checkbox' ref={register()} /></TableDataR>
                </tr>
                <tr>
                  <TableDataL> Descubierto </TableDataL>
                  <TableDataR><Input name='overdraftNL' /></TableDataR>
                </tr>
                <tr>
                  <TableDataL><TButton type='submit'> Confirmar </TButton></TableDataL>
                </tr>
              </tbody>
            </Table>
          </form>}
        {isLegal &&
          <form onSubmit={handleSubmit(onSubmitLegal)}>
            <Table>
              <Caption> Registrar cliente </Caption>
              <tbody>
                <tr>
                  <TableDataL> Razon Social </TableDataL>
                  <TableDataR><Input name='companyName' type='text' ref={register({ required: true })} /></TableDataR>
                </tr>
                <tr>
                  <TableDataL> CUIT/CUIL </TableDataL>
                  <TableDataR>
                    <Input name='cuitCuilL' type='number' step='any' ref={register({ required: true, min: 0 })} />
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Nombre de usuario </TableDataL>
                  <TableDataR>
                    <Input name='usernameL' type='text' ref={register({ required: true })} />
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Domicilio </TableDataL>
                  <TableDataR>
                    <Input name='addressL' type='text' ref={register({ required: true })} />
                    {errors.amountToNotOwned && <span> Debe ingresar un monto </span>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Telefono </TableDataL>
                  <TableDataR><Input name='phoneL' type='number' step='any' ref={register({ required: true, min: 0 })} /></TableDataR>
                </tr>
                <tr>
                  <TableDataL> Cuenta corriente </TableDataL>
                  <TableDataR><Input name='checkingL' type='checkbox' /></TableDataR>
                </tr>
                <tr>
                  <TableDataL> Descubierto </TableDataL>
                  <TableDataR><Input name='overdraftL' /></TableDataR>
                </tr>
                <tr>
                  <TableDataL><TButton type='submit'> Confirmar </TButton></TableDataL>
                </tr>
              </tbody>
            </Table>
          </form>}
        <FixBar />
      </Content>
      <Footer id='footer' />
    </GlobalContainer>
  )
}

export default RegisterClient
