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
import { userService } from '../services/userService'
import { useAlert } from 'react-alert'

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

const RegisterClient = () => {
  const { register, handleSubmit, errors } = useForm()
  const alert = useAlert()
  const [isLegal, setIsLegal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = (data) => {
    setIsLoading(true)
    const createUser = isLegal ? userService.registerLegalUser(data) : userService.registerPhysicalUser(data)
    createUser
      .then((data) => {
        alert.success('Usuario creado con exito! Contraseña: ' + data.password)
      })
      .catch((message) => {
        alert.error(message)
      })
      .finally(() => setIsLoading(false))
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Table>
              <Caption> Registrar cliente </Caption>
              <tbody>
                <tr>
                  <TableDataL> Nombre y Apellido </TableDataL>
                  <TableDataR>
                    <Input name='firstName' type='text' ref={register({ required: true, pattern: /^[A-Z][a-z]+(?:[ -][A-Z][a-z]+)*$/ })} />
                    {errors.firstName && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Nombre y Apellido </TableDataL>
                  <TableDataR>
                    <Input name='lastName' type='text' ref={register({ required: true, pattern: /^[A-Z][a-z]+(?:[ -][A-Z][a-z]+)*$/ })} />
                    {errors.lastName && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> CUIT/CUIL </TableDataL>
                  <TableDataR>
                    <Input name='cuitCuil' type='text' ref={register({ required: true, pattern: /^[0-9]{2}-[0-9]{8}-[0-9]$/ })} />
                    {errors.cuitCuil && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> DNI </TableDataL>
                  <TableDataR>
                    <Input name='dni' type='text' ref={register({ required: true, pattern: /^\d{8}(?:[-\s]\d{4})?$/ })} />
                    {errors.dni && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Nombre de Usuario </TableDataL>
                  <TableDataR>
                    <Input name='username' type='text' ref={register({ required: true, pattern: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/ })} />
                    {errors.username && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Domicilio </TableDataL>
                  <TableDataR>
                    <Input name='address' type='text' ref={register({ required: true, max: 255 })} />
                    {errors.address && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Fecha de nacimiento </TableDataL>
                  <TableDataR>
                    <Input name='birthDate' type='date' ref={register({ required: true, min: '1900-01-01', max: '2100-01-01' })} />
                    {errors.birthDatey && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Telefono </TableDataL>
                  <TableDataR>
                    <Input name='phone' type='text' ref={register({ required: true, pattern: /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/ })} />
                    {errors.phone && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Celular </TableDataL>
                  <TableDataR>
                    <Input name='mobilePhone' type='text' ref={register({ required: true, pattern: /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/ })} />
                    {errors.mobilePhone && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Cuenta Corriente </TableDataL>
                  <TableDataR>
                    <Input name='withCheckingAccount' type='checkbox' ref={register()} />
                    {errors.withCheckingAccount && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Descubierto </TableDataL>
                  <TableDataR>
                    <Input name='maxOverdraft' type='number' step='any' ref={register()} />
                    {errors.maxOverdraft && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL><TButton type='submit' disabled={isLoading}> Confirmar </TButton></TableDataL>
                </tr>
              </tbody>
            </Table>
          </form>}
        {isLegal &&
          <form onSubmit={handleSubmit(onSubmit)}>
            <Table>
              <Caption> Registrar cliente </Caption>
              <tbody>
                <tr>
                  <TableDataL> Razon Social </TableDataL>
                  <TableDataR>
                    <Input name='businessName' type='text' ref={register({ required: true, pattern: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/ })} />
                    {errors.businessName && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> CUIT/CUIL </TableDataL>
                  <TableDataR>
                    <Input name='cuitCuilLegalEntity' type='text' step='any' ref={register({ required: true, pattern: /^[0-9]{2}-[0-9]{8}-[0-9]$/ })} />
                    {errors.cuitCuilLegalEntity && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Nombre de usuario </TableDataL>
                  <TableDataR>
                    <Input name='usernameLegalEntity' type='text' ref={register({ required: true, pattern: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/ })} />
                    {errors.usernameLegalEntity && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Domicilio </TableDataL>
                  <TableDataR>
                    <Input name='addressLegalEntity' type='text' ref={register({ required: true, max: 255 })} />
                    {errors.addressLegalEntity && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Telefono </TableDataL>
                  <TableDataR>
                    <Input name='phoneLegalEntity' type='text' step='any' ref={register({ required: true, pattern: /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/ })} />
                    {errors.phoneLegalEntity && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Cuenta corriente </TableDataL>
                  <TableDataR>
                    <Input name='withCheckingAccountLegalEntity' type='checkbox' ref={register()} />
                    {errors.withCheckingAccountLegalEntity && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Descubierto </TableDataL>
                  <TableDataR>
                    <Input name='maxOverdraftLegalEntity' type='number' step='any' ref={register()} />
                    {errors.maxOverdraftLegalEntity && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL><TButton type='submit' disabled={isLoading}> Confirmar </TButton></TableDataL>
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
