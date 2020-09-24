import React, { useState } from 'react'
import Content from '../components/Content'
import Dropdown from '../components/Dropdown'
import Footer from '../components/Footer'
import GlobalContainer from '../components/GlobalContainer'
import Header from '../components/Header'
import Text from '../components/Text'
import { useForm } from 'react-hook-form'
import { serviceService } from '../services/serviceService'
import { useAlert } from 'react-alert'

import styled from 'styled-components'
import ErrorMsg from '../components/ErrorMsg'
import { Table, TButton, TableDataL, TableDataR } from '../components/Table'
import { transactionService } from '../services/transactionService'

const Input = styled.input`
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 20vw;
  text-align: center;
`
const TableDataRw = styled.td`
  padding: 10px 20%;
`
const FixBar = styled.div`
 height: 10vh;
  width: 100%;
`
const ServicePay = () => {
  const alert = useAlert()
  const { register, handleSubmit, errors } = useForm()
  const {
    register: registerA,
    errors: errorsA,
    handleSubmit: handleSubmitA
  } = useForm();
  const [vendorName, setVendorName] = useState()
  const [serviceName, setServiceName] = useState()
  const [serviceId, setServiceId] = useState()
  const [vendorId, setVendorId] = useState()
  const [amount, setAmount] = useState()
  const [due, setDue] = useState()
  const [acc, setAcc] = useState('')

  const items = []
  
  if(sessionStorage.getItem('userSavings') !== 'null'){
    items.push({id: sessionStorage.getItem('userSavings'), value: 'CA ' + sessionStorage.getItem('userSavings')})
  }
  if(sessionStorage.getItem('userChecking') !== 'null'){
    items.push({id: sessionStorage.getItem('userChecking'), value: 'CC ' + sessionStorage.getItem('userChecking')})
  }

  const onSubmit = (data) => {
    const searchService = serviceService.searchService(data)
    setVendorId(data.vendorId)
    searchService
    .then((data) =>{
      console.log(data)
      setServiceName(data.name)
      setServiceId(data.servicePaymentId)
      setVendorName(data.vendor.businessName)
      setAmount(data.amount)
      setDue(data.dueDate)
    })
  }

  const onSubmitA = () => {
    const usernameFrom = sessionStorage.getItem('user')

    console.log(acc)
    const payService = transactionService.payService(acc,serviceId, usernameFrom, vendorId)
    payService
    .then((response) =>{
      if(response !== 'transactionError'){
        alert.success('Extraccion realizada con exito ')
      }
      else{
        alert.error('Operación fallida. Chequee que la cuenta tenga el saldo suficiente para realizar la operación.')
      }
    })
  }
  return (
    <GlobalContainer id='globalContainer'>
      <Header id='header' />
      <Content id='content' direction='column'>
        <Text> Pago de servicios </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Table>
            <tbody>
              <tr>
                <TableDataL><p> Identificador del proveedor: </p></TableDataL>
                <TableDataL>
                  <Input name='vendorId' type='text' ref={register({ required: true })} />
                  {errors.vendorId && <ErrorMsg> Debe ingresar un id de proveedor </ErrorMsg>}
                </TableDataL>      
              </tr>
              <tr>
                <TableDataL><p> Identificador del servicio: </p></TableDataL>
                <TableDataL>
                  <Input name='servicePaymentId' type='text' ref={register({ required: true })} />
                  {errors.servicePaymentId && <ErrorMsg> Debe ingresar un id de servicio </ErrorMsg>}
                </TableDataL>
                 <TableDataL>
                  <TButton type='submit'>
                    Buscar
                  </TButton>
                </TableDataL>
              </tr>
              </tbody>
          </Table>
        </form>
        <form onSubmit={handleSubmitA(onSubmitA)}>
          <Table>
            <tbody>
              <tr>
                <TableDataL> Nombre del Proveedor: </TableDataL>
                <TableDataR> {vendorName} </TableDataR>
              </tr>
              <tr>
                <TableDataL> Nombre del Servicio: </TableDataL>
                <TableDataR> {serviceName} </TableDataR>
              </tr>
              <tr>
                <TableDataL> Monto adeudado: </TableDataL>
                <TableDataR> {amount} </TableDataR>
              </tr>
              <tr>
                <TableDataL> Fecha de vencimiento: </TableDataL>
                <TableDataR> {due} </TableDataR>
              </tr>
              <tr>
                <TableDataL><p> Cuenta a debitar: </p></TableDataL>
                <TableDataL><Dropdown title='Seleccione cuenta' items={items} updateParent={id => setAcc(id)}/></TableDataL>
                <TableDataL><TButton type='submit'> Pagar </TButton></TableDataL>
              </tr>
            </tbody>
          </Table>
        </form>
        <FixBar />
      </Content>
      <Footer id='footer' />
    </GlobalContainer>
  )
}

export default ServicePay
