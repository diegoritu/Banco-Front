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
const TableAlt = styled(Table)`
width:60%;
@media only screen and (max-width: 480px) {
  width: 100%;
}
margin-left: auto;
margin-right: auto;
margin-top: 2%;
margin-bottom: 2%;
border-collapse: collapse;
background-color: #e1e1e182;
`

const ToggleWrapper = styled.div`
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
`

const FixBar = styled.div`
 height: 10vh;
  width: 100%;
`

const Button = styled.button`
  width: 50%;
  font-size: 15pt;
  padding: 10px;
  background-color: #b2b2b28c;
  
`
const ButtonSelected = styled.button`
  width: 50%;
  font-size: 15pt;
  padding: 10px;
  background-color: #1877f2;
  color: white;
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
        alert.success('Usuario creado con exito! Contraseña: ' + data.password, {timeout: 0})
      })
      .catch((message) => {
        alert.error(message)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <GlobalContainer id='globalContainer'>
      <Header id='header' />
      <Content id='content' url="background.png" direction='column'>
        <Text> Registro de nueva persona </Text>
        <ToggleWrapper>
        {isLegal ?
            (<React.Fragment>
                <Button onClick={() => setIsLegal(false)}> Física </Button>
                <ButtonSelected onClick={() => setIsLegal(true)}> Jurídica </ButtonSelected>
            </React.Fragment>)
          : 
            (<React.Fragment>
                <ButtonSelected onClick={() => setIsLegal(false)}> Física </ButtonSelected>
                <Button onClick={() => setIsLegal(true)}> Jurídica </Button>
            </React.Fragment>)
          }        
        </ToggleWrapper>
        {!isLegal &&
          <form onSubmit={handleSubmit(onSubmit)}>
            <TableAlt>
              <Caption> Registrar cliente </Caption>
              <tbody>
                <tr>
                  <TableDataL> Nombre </TableDataL>
                  <TableDataR>
                    <Input name='firstName' type='text' ref={register({ required: true, pattern: /^[A-Z][a-z]+(?:[ -][A-Z][a-z]+)*$/ })} />
                    <div>{errors.firstName && <ErrorMsg> x </ErrorMsg>}</div>
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Apellido </TableDataL>
                  <TableDataR>
                    <Input name='lastName' type='text' ref={register({ required: true, pattern: /^[A-Z][a-z]+(?:[ -][A-Z][a-z]+)*$/ })} />
                    <div>{errors.lastName && <ErrorMsg> x </ErrorMsg>}</div>
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> CUIT/CUIL </TableDataL>
                  <TableDataR>
                    <Input name='cuitCuil' type='text' ref={register({ required: true, pattern: /^[0-9]{2}-[0-9]{8}-[0-9]$/ })} />
                    <div>{errors.cuitCuil && <ErrorMsg> x Verifique que su CUIT tenga el siguiente formato: XX-XXXXXXXX-X </ErrorMsg>}</div>
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> DNI </TableDataL>
                  <TableDataR>
                    <Input name='dni' type='text' ref={register({ required: true, pattern: /^\d{8}(?:[-\s]\d{4})?$/ })} />
                    <div>{errors.dni && <ErrorMsg> x </ErrorMsg>}</div>
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Nombre de Usuario </TableDataL>
                  <TableDataR>
                    <Input name='username' type='text' ref={register({ required: true, pattern: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/ })} />
                    <div>
                    {errors.username && <ErrorMsg> x </ErrorMsg>}
                    </div>
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Domicilio </TableDataL>
                  <TableDataR>
                    <Input name='address' type='text' ref={register({ required: true, max: 255 })} />
                    <div>
                    {errors.address && <ErrorMsg> x </ErrorMsg>}
                    </div>
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Fecha de nacimiento </TableDataL>
                  <TableDataR>
                    <Input name='birthDate' type='date' ref={register({ required: true, min: '1900-01-01', max: '2100-01-01' })} />
                    <div>
                    {errors.birthDatey && <ErrorMsg> x </ErrorMsg>}
                    </div>
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Teléfono </TableDataL>
                  <TableDataR>
                    <Input name='phone' type='text' ref={register({ required: true, pattern: /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/ })} />
                    <div>
                    {errors.phone && <ErrorMsg> x Verifique que su teléfono tenga el siguiente formato: XXXXXXXXXX</ErrorMsg>}
                    </div>
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Celular </TableDataL>
                  <TableDataR>
                    <Input name='mobilePhone' type='text' ref={register({ required: true, pattern: /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/ })} />
                    <div>{errors.mobilePhone && <ErrorMsg> x Verifique que su teléfono tenga el siguiente formato: XXXXXXXXXX</ErrorMsg>}</div>
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Cuenta Corriente </TableDataL>
                  <TableDataR>
                    <Input name='withCheckingAccount' type='checkbox' ref={register()} />
                    <div>{errors.withCheckingAccount && <ErrorMsg> x </ErrorMsg>}</div>
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Descubierto </TableDataL>
                  <TableDataR>
                    <Input name='maxOverdraft' type='number' step='any' ref={register()} />
                    <div>{errors.maxOverdraft && <ErrorMsg> x </ErrorMsg>}</div>
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL><TButton type='submit' disabled={isLoading}> Confirmar </TButton></TableDataL>
                </tr>
              </tbody>
            </TableAlt>
          </form>}
        {isLegal &&
          <form onSubmit={handleSubmit(onSubmit)}>
            <TableAlt>
              <Caption> Registrar cliente </Caption>
              <tbody>
                <tr>
                  <TableDataL> Razón Social </TableDataL>
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
                  <TableDataL> Teléfono </TableDataL>
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
            </TableAlt>
          </form>}
        <FixBar />
      </Content>
      <Footer id='footer' />
    </GlobalContainer>
  )
}

export default RegisterClient
