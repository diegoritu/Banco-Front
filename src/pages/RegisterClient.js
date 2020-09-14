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
                    {errors.fullname && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> CUIT/CUIL </TableDataL>
                  <TableDataR>
                    <Input name='cuitCuilNL' type='text' ref={register({ required: true, pattern: /^[0-9]{2}-[0-9]{8}-[0-9]$/ })} />
                    {errors.cuitCuilNL && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> DNI </TableDataL>
                  <TableDataR>
                    <Input name='dni' type='number' ref={register({ required: true, min: 0, max: 100000000 })} />
                    {errors.dni && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Nombre de Usuario </TableDataL>
                  <TableDataR>
                    <Input name='usernameNL' type='text' ref={register({ required: true, pattern: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/ })} />
                    {errors.usernameNL && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Domicilio </TableDataL>
                  <TableDataR>
                    <Input name='addressNL' type='text' ref={register({ required: true, max: 255 })} />
                    {errors.addressNL && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Fecha de nacimiento </TableDataL>
                  <TableDataR>
                    <Input name='birthday' type='date' ref={register({ required: true, min: '1900-01-01', max: '2100-01-01' })} />
                    {errors.birthday && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Telefono </TableDataL>
                  <TableDataR>
                    <Input name='phoneNL' type='text' ref={register({ required: true, pattern: /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/ })} />
                    {errors.phoneNL && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Celular </TableDataL>
                  <TableDataR>
                    <Input name='mobileNL' type='text' ref={register({ required: true, pattern: /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/ })} />
                    {errors.mobileNL && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Cuenta Corriente </TableDataL>
                  <TableDataR>
                    <Input name='checkingNL' type='checkbox' ref={register()} />
                    {errors.chekingNL && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Descubierto </TableDataL>
                  <TableDataR>
                    <Input name='overdraftNL' type='number' step='any' ref={register()} />
                    {errors.overdraftNL && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
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
                  <TableDataR>
                    <Input name='companyName' type='text' ref={register({ required: true, pattern: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/ })} />
                    {errors.companyName && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> CUIT/CUIL </TableDataL>
                  <TableDataR>
                    <Input name='cuitCuilL' type='number' step='any' ref={register({ required: true, pattern: /^[0-9]{2}-[0-9]{8}-[0-9]$/ })} />
                    {errors.cuitCuilL && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Nombre de usuario </TableDataL>
                  <TableDataR>
                    <Input name='usernameL' type='text' ref={register({ required: true, pattern: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/ })} />
                    {errors.usernameL && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Domicilio </TableDataL>
                  <TableDataR>
                    <Input name='addressL' type='text' ref={register({ required: true, max: 255 })} />
                    {errors.addressL && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Telefono </TableDataL>
                  <TableDataR>
                    <Input name='phoneL' type='number' step='any' ref={register({ required: true, pattern: /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/ })} />
                    {errors.phoneL && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Cuenta corriente </TableDataL>
                  <TableDataR>
                    <Input name='checkingL' type='checkbox' ref={register()} />
                    {errors.checkingL && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Descubierto </TableDataL>
                  <TableDataR>
                    <Input name='overdraftL' type='number' step='any' ref={register()} />
                    {errors.overdraftL && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
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
