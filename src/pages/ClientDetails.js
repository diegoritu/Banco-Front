import React, { useState } from 'react'
import Content from '../components/Content'
import Footer from '../components/Footer'
import GlobalContainer from '../components/GlobalContainer'
import Header from '../components/Header'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import ErrorMsg from '../components/ErrorMsg'
import { Table, TButton, TableDataL, TableDataR, Caption } from '../components/Table'
import { userService } from '../services/userService'
import { accountService } from '../services/accountService'
import { useAlert } from 'react-alert'
import { useHistory } from 'react-router-dom';

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

const FixBar = styled.div`
 height: 10vh;
  width: 100%;
`

const ClientDetails = (props) => {
  const history = useHistory()
  const alert = useAlert()
  const { register, handleSubmit, errors } = useForm()
  const {
    register: registerChecking,
    errors: errorsChecking,
    handleSubmit: handleSubmitChecking
    } = useForm()

  
  const data = props.location.state ? props.location.state.user : {}
  console.log(data)

  const onSubmitNotLegal = (formData) => {
    setIsDisabled(true)
    setIsSaveDisabled(true)
    const modifyUser = userService.modifyPhysicalUser(formData, oldUsername)
    modifyUser
      .then((data) => {
        alert.success('Los cambios han sido guardados')
        history.push('/searchClient')
      })
      .catch((message) => {
        alert.error(message)
        history.push('/searchClient')
      })
  }
  const onSubmitLegal = (formData) => {
    setIsDisabled(true)
    setIsSaveDisabled(true)
    const modifyUser = userService.modifyLegalUser(formData, oldUsername)
    modifyUser
      .then((data) => {
        alert.success('Los cambios han sido guardados')
        history.push('/searchClient')

      })
      .catch((message) => {
        alert.error(message)
        history.push('/searchClient')
      })
  }



  const openChecking = () => {
    setWithChecking(true)
    setIsDisabledChecking(false)   
  }
  const closeChecking = () =>{

    accountService.closeChecking(data.username)
    .then(
      response => {
        if (response !== 'balanceError') {
          alert.success('Se cerró la Cuenta Corriente del usuario')
          history.push('/searchClient')
        }
        else
        {
          alert.error('No se pudo cerrar la cuenta. Chequee que esta tenga saldo 0')
          history.push('/searchClient')
        }
      }
    )
    .catch(error => {
      console.log(error)
    })

  }

  const resetPassword = () =>{

    userService.resetPassword(data.username)
    .then(
      response => {
        if (response === 'notFoud') {
          alert.error('No se encontró el usuario.')
          history.push('/searchClient')
        }
        else{
          alert.success('Se reseteó la clave del usuario. Su contraseña temporal es: ' + response.password, {timeout: 0})
          history.push('/searchClient')

        }
      }
    )
    .catch(error => {
      console.log(error)
    })

  }

  const disableClient = () =>{

    userService.disableUser(data.username)
    .then(
      response => {
        if (response === 'notFoud') {
          alert.error('No se encontró el usuario a deshabilitar.')
          history.push('/searchClient')
        }
        else if(response === 'closeError' || response.status === 404){
          alert.error('No se puedo deshabilitar al usuario. Chequee que sus cuentas tengan saldo 0')
          history.push('/searchClient')

        }
        else
        {
          alert.success('Se deshabilitó al usuario.')
          history.push('/searchClient')
        }
      }
    )
    .catch(error => {
      console.log(error)
    })

  }

  const onSubmitChecking = (formData) => {
    setIsDisabledChecking(true)
    setIsSaveDisabledChecking(true)

    if(!startWithChecking){
      //Open checking
      const openChecking = accountService.openChecking(formData, data.username)
      openChecking
        .then((data) => {
          alert.success('Se abrió la Cuenta Corriente del usuario')
          history.push('/searchClient')
        })
        .catch((message) => {
          alert.error(message)
          history.push('/searchClient')
        })

    }
    else{
      //Change maxOverdraft
      const modifyChecking = accountService.modifyChecking(formData, data.checking.accountNumber)
      modifyChecking
        .then((data) => {
          alert.success('Se modificó el monto de giro en descubierto')
          history.push('/searchClient')
        })
        .catch((message) => {
          alert.error(message)
          history.push('/searchClient')
        })
  
    }
  }



  const oldUsername = data.username

  const [isDisabled, setIsDisabled] = useState(true)
  const [isDisabledChecking, setIsDisabledChecking] = useState(true)

  const [isSaveDisabled, setIsSaveDisabled] = useState(true)
  const [isSaveDisabledChecking, setIsSaveDisabledChecking] = useState(true)
  
  const [withChecking, setWithChecking] = useState(data.checking ? true : false)
  const [startWithChecking, setStartWithChecking] = useState(data.checking ? true : false)

  return (
    <GlobalContainer id='globalContainer'>
      <Header id='header' />
      <Content id='content' url="background.png" direction='column'>
        {(data.userType === 'PHYSICAL') &&
          <form onSubmit={handleSubmit(onSubmitNotLegal)} onChange={() => setIsSaveDisabled(false)}>
            <TableAlt>
              <Caption> Datos cliente </Caption>
              <tbody>
                <tr>
                  <TableDataL> Nombre </TableDataL>
                  <TableDataR>
                    <Input name='firstName' disabled={isDisabled} defaultValue={data.firstName} type='text' ref={register({ required: true, pattern: /^[A-Z][a-z]+(?:[ -][A-Z][a-z]+)*$/ })} />
                    <div>{errors.fullname && <ErrorMsg> x </ErrorMsg>}</div>
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Apellido </TableDataL>
                  <TableDataR>
                    <Input name='lastName' disabled={isDisabled} defaultValue={data.lastName} type='text' ref={register({ required: true, pattern: /^[A-Z][a-z]+(?:[ -][A-Z][a-z]+)*$/ })} />
                    <div>{errors.fullname && <ErrorMsg> x </ErrorMsg>}</div>
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> CUIT/CUIL </TableDataL>
                  <TableDataR>
                    <Input name='cuitCuilCdi' disabled defaultValue={data.cuitCuilCdi} type='text' />
                    <div>{errors.cuitCuil && <ErrorMsg> x Verifique que su CUIT tenga el siguiente formato: XX-XXXXXXXX-X </ErrorMsg>}</div>
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> DNI </TableDataL>
                  <TableDataR>
                    <Input name='dni' disabled defaultValue={data.dni} type='text' />
                    <div>{errors.dni && <ErrorMsg> x </ErrorMsg>}</div>
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Nombre de Usuario </TableDataL>
                  <TableDataR>
                    <Input name='username' disabled={isDisabled} defaultValue={data.username} type='text' ref={register({ required: true, pattern: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/ })} />
                    <div>{errors.username && <ErrorMsg> x </ErrorMsg>}</div>
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Domicilio </TableDataL>
                  <TableDataR>
                    <Input name='address' disabled={isDisabled} defaultValue={data.address} type='text' ref={register({ required: true, max: 255 })} />
                    <div>{errors.address && <ErrorMsg> x </ErrorMsg>}</div>
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Fecha de nacimiento </TableDataL>
                  <TableDataR>
                    <Input name='birthDate' disabled={isDisabled} defaultValue={data.birthDate} type='date' ref={register({ required: true, min: '1900-01-01', max: '2100-01-01' })} />
                    <div>{errors.birthday && <ErrorMsg> x </ErrorMsg>}</div>
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Teléfono </TableDataL>
                  <TableDataR>
                    <Input name='phone' disabled={isDisabled} defaultValue={data.phone} type='text' ref={register({ required: true, pattern: /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/ })} />
                    <div>{errors.phone && <ErrorMsg> x Verifique que su teléfono tenga el siguiente formato: XXXXXXXXXX</ErrorMsg>}</div>
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Celular </TableDataL>
                  <TableDataR>
                    <Input name='mobilePhone' disabled={isDisabled} defaultValue={data.mobilePhone} type='text' ref={register({ required: true, pattern: /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/ })} />
                    <div>{errors.mobile && <ErrorMsg> x Verifique que su teléfono tenga el siguiente formato: XXXXXXXXXX</ErrorMsg>}</div>
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataR><TButton type='button' onClick={() => setIsDisabled(!isDisabled)}> Modificar </TButton></TableDataR>
                  {!isDisabled && <TableDataR><TButton disabled={isSaveDisabled} type='submit'> Guardar </TButton></TableDataR>}
                </tr>
              </tbody>
            </TableAlt>
          </form>}
        {(data.userType === 'LEGAL') &&
          <form onSubmit={handleSubmit(onSubmitLegal)} onChange={() => setIsSaveDisabled(false)}>
            <TableAlt>
              <Caption> Datos cliente </Caption>
              <tbody>
                <tr>
                  <TableDataL> Razon Social </TableDataL>
                  <TableDataR>
                    <Input name='businessName' disabled={isDisabled} defaultValue={data.businessName} type='text' ref={register({ required: true})} />
                    <div>{errors.businessName && <ErrorMsg> x </ErrorMsg>}</div>
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> CUIT/CUIL </TableDataL>
                  <TableDataR>
                    <Input name='cuitCuilCdi' disabled defaultValue={data.cuitCuilCdi} type='text' />
                    <div>{errors.cuitCuilCdi && <ErrorMsg> x Verifique que su CUIT tenga el siguiente formato: XX-XXXXXXXX-X</ErrorMsg>}</div>
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Nombre de usuario </TableDataL>
                  <TableDataR>
                    <Input name='username' disabled={isDisabled} defaultValue={data.username} type='text' ref={register({ required: true, pattern: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/ })} />
                    <div>{errors.usernameLegalEntity && <ErrorMsg> x </ErrorMsg>}</div>
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Domicilio </TableDataL>
                  <TableDataR>
                    <Input name='address' disabled={isDisabled} defaultValue={data.address} type='text' ref={register({ required: true, max: 255 })} />
                    <div>{errors.address && <ErrorMsg> x </ErrorMsg>}</div>
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Teléfono </TableDataL>
                  <TableDataR>
                    <Input name='phone' disabled={isDisabled} defaultValue={data.phone} type='text' ref={register({ required: true, pattern: /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/ })} />
                    <div>{errors.phoneLegalEntity && <ErrorMsg> x Verifique que su teléfono tenga el siguiente formato: XXXXXXXXXX</ErrorMsg>}</div>
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL><TButton type='button' onClick={() => setIsDisabled(false)}> Modificar </TButton></TableDataL>
                  {!isDisabled && <TableDataR><TButton disabled={isSaveDisabled} type='submit'> Guardar </TButton></TableDataR> }
                </tr>
              </tbody>
            </TableAlt>
          </form>}
          
          {withChecking &&
            <form onSubmit={handleSubmitChecking(onSubmitChecking)} onChange={() => setIsSaveDisabledChecking(false)}>
              <TableAlt>
              <Caption> Cuenta Corriente </Caption>
              <tbody>
                  {startWithChecking &&
                    <tr>
                      <TableDataL> Cuenta Corriente </TableDataL>
                      <TableDataR>
                        <Input name='accountNumber' disabled defaultValue={data.checking ? data.checking.accountNumber : ''} type='text' />
                        <div>{errorsChecking.accountNumber && <ErrorMsg> x </ErrorMsg>}</div>
                      </TableDataR>
                    </tr>
                  }
                  <tr>
                    <TableDataL> Descubierto </TableDataL>
                    <TableDataR>
                      <Input name='maxOverdraft' disabled={isDisabledChecking} defaultValue={data.checking ? data.checking.maxOverdraft : ''} type='number' step='any' ref={registerChecking()} />
                      <div>{errorsChecking.maxOverdraft && <ErrorMsg> x </ErrorMsg>}</div>
                    </TableDataR>
                  </tr>
                  {startWithChecking ? 
                  <tr>
                    <TableDataL><TButton type='button' onClick={() => setIsDisabledChecking(false)}> Modificar descubierto </TButton></TableDataL>
                    {!isDisabledChecking && <TableDataR><TButton disabled={isSaveDisabledChecking} type='submit'> Guardar modificación </TButton></TableDataR>}                    
                  </tr>       
                  : 
                  <tr>
                  <TableDataL></TableDataL>
                  <TableDataR><TButton type='submit'> Confirmar apertura de cuenta corriente </TButton></TableDataR>
                </tr>
              
                  }
              </tbody>
            </TableAlt>
            </form>
          }

        <TableAlt>
          <tbody>
            <tr>
              {data.checking && <TableDataL><TButton type='button' onClick={() => closeChecking()}> Cerrar cuenta corriente </TButton></TableDataL>}
              {!data.checking && <TableDataL><TButton type='button' onClick={() => openChecking()}> Abrir cuenta corriente </TButton></TableDataL>}
              <TableDataL><TButton type='button' onClick={() => disableClient()}> Deshabilitar cliente </TButton></TableDataL>
              <TableDataL><TButton type='button'onClick={() => resetPassword()}> Resetear contraseña </TButton></TableDataL>
            </tr>
          </tbody>
        </TableAlt>
        <FixBar />
      </Content>
      <Footer id='footer' />
    </GlobalContainer>
  )
}

export default ClientDetails
