import React, { useState } from 'react'
import Content from '../components/Content'
import Footer from '../components/Footer'
import GlobalContainer from '../components/GlobalContainer'
import Header from '../components/Header'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import ErrorMsg from '../components/ErrorMsg'
import { Table, TButton, TableDataL, TableDataR, Caption } from '../components/Table'

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  width: 20vw;
`

const FixBar = styled.div`
 height: 10vh;
  width: 100%;
`

const ClientDetails = (props) => {
  const { register, handleSubmit, errors } = useForm()
  const data = props.location.state ? props.location.state.user : {}
  console.log(data)

  const onSubmitNotLegal = (formData) => {
    setIsDisabled(true)
    setIsSaveDisabled(true)
    console.log(formData)
  }
  const onSubmitLegal = (formData) => {
    setIsDisabled(true)
    setIsSaveDisabled(true)
    console.log(formData)
    console.log(data.usernameLegalEntity)
  }
  const [isDisabled, setIsDisabled] = useState(true)
  const [isSaveDisabled, setIsSaveDisabled] = useState(true)

  return (
    <GlobalContainer id='globalContainer'>
      <Header id='header' />
      <Content id='content' direction='column'>
        {(data.userType === 'PHYSICAL') &&
          <form onSubmit={handleSubmit(onSubmitNotLegal)} onChange={() => setIsSaveDisabled(false)}>
            <Table>
              <Caption> Datos cliente </Caption>
              <tbody>
                <tr>
                  <TableDataL> Nombre y Apellido </TableDataL>
                  <TableDataR>
                    <Input name='fullname' disabled={isDisabled} defaultValue={data.firstName + ' ' + data.lastName} type='text' ref={register({ required: true, pattern: /^[A-Z][a-z]+(?:[ -][A-Z][a-z]+)*$/ })} />
                    {errors.fullname && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> CUIT/CUIL </TableDataL>
                  <TableDataR>
                    <Input name='cuitCuil' disabled defaultValue={data.cuitCuilCdi} type='text' ref={register({ required: true, pattern: /^[0-9]{2}-[0-9]{8}-[0-9]$/ })} />
                    {errors.cuitCuil && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> DNI </TableDataL>
                  <TableDataR>
                    <Input name='dni' disabled defaultValue={data.dni} type='text' ref={register({ required: true, pattern: /^\d{8}(?:[-\s]\d{4})?$/ })} />
                    {errors.dni && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Nombre de Usuario </TableDataL>
                  <TableDataR>
                    <Input name='username' disabled={isDisabled} defaultValue={data.username} type='text' ref={register({ required: true, pattern: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/ })} />
                    {errors.username && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Domicilio </TableDataL>
                  <TableDataR>
                    <Input name='address' disabled={isDisabled} defaultValue={data.address} type='text' ref={register({ required: true, max: 255 })} />
                    {errors.address && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Fecha de nacimiento </TableDataL>
                  <TableDataR>
                    <Input name='birthday' disabled={isDisabled} defaultValue={data.birthDate} type='date' ref={register({ required: true, min: '1900-01-01', max: '2100-01-01' })} />
                    {errors.birthday && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Telefono </TableDataL>
                  <TableDataR>
                    <Input name='phone' disabled={isDisabled} defaultValue={data.phone} type='text' ref={register({ required: true, pattern: /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/ })} />
                    {errors.phone && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Celular </TableDataL>
                  <TableDataR>
                    <Input name='mobile' disabled={isDisabled} defaultValue={data.mobilePhone} type='text' ref={register({ required: true, pattern: /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/ })} />
                    {errors.mobile && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Cuenta Corriente </TableDataL>
                  <TableDataR>
                    <Input name='checking' disabled defaultValue={data.checking ? data.checking.accountNumber : ''} type='text' />
                    {errors.checking && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Descubierto </TableDataL>
                  <TableDataR>
                    <Input name='overdraft' disabled={isDisabled} defaultValue={data.checking ? data.checking.maxOverdraft : ''} type='number' step='any' ref={register()} />
                    {errors.mobile && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataR><TButton type='button' onClick={() => setIsDisabled(!isDisabled)}> Modificar </TButton></TableDataR>
                  {!isDisabled && <TableDataR><TButton disabled={isSaveDisabled} type='submit'> Guardar </TButton></TableDataR>}
                </tr>
              </tbody>
            </Table>
          </form>}
        {(data.userType === 'LEGAL') &&
          <form onSubmit={handleSubmit(onSubmitLegal)} onChange={() => setIsSaveDisabled(false)}>
            <Table>
              <Caption> Datos cliente </Caption>
              <tbody>
                <tr>
                  <TableDataL> Razon Social </TableDataL>
                  <TableDataR>
                    <Input name='companyName' disabled={isDisabled} defaultValue={data.companyName} type='text' ref={register({ required: true, pattern: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/ })} />
                    {errors.companyName && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> CUIT/CUIL </TableDataL>
                  <TableDataR>
                    <Input name='cuitCuilLegalEntity' disabled defaultValue={data.cuitCuilLegalEntity} type='text' ref={register({ required: true, pattern: /^[0-9]{2}-[0-9]{8}-[0-9]$/ })} />
                    {errors.cuitCuilLegalEntity && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Nombre de usuario </TableDataL>
                  <TableDataR>
                    <Input name='usernameLegalEntity' disabled={isDisabled} defaultValue={data.usernameLegalEntity} type='text' ref={register({ required: true, pattern: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/ })} />
                    {errors.usernameLegalEntity && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Domicilio </TableDataL>
                  <TableDataR>
                    <Input name='addressLegalEntity' disabled={isDisabled} defaultValue={data.addressLegalEntity} type='text' ref={register({ required: true, max: 255 })} />
                    {errors.addressLegalEntity && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Telefono </TableDataL>
                  <TableDataR>
                    <Input name='phoneLegalEntity' disabled={isDisabled} defaultValue={data.phoneLegalEntity} type='text' ref={register({ required: true, pattern: /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/ })} />
                    {errors.phoneLegalEntity && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL><TButton type='button' onClick={() => setIsDisabled(false)}> Modificar </TButton></TableDataL>
                  <TableDataR><TButton disabled={isSaveDisabled} type='submit'> Guardar </TButton></TableDataR>
                </tr>
              </tbody>
            </Table>
          </form>}
        <Table>
          <tbody>
            <tr>
              {data.checking && <TableDataL><TButton type='button'> Cerrar cuenta corriente </TButton></TableDataL>}
              {!data.checking && <TableDataL><TButton type='button'> Abrir cuenta corriente </TButton></TableDataL>}
              <TableDataL><TButton type='button'> Deshabilitar cliente </TButton></TableDataL>
              <TableDataL><TButton type='button'> Reiniciar contraseña </TButton></TableDataL>
            </tr>
          </tbody>
        </Table>
        <FixBar />
      </Content>
      <Footer id='footer' />
    </GlobalContainer>
  )
}

export default ClientDetails
