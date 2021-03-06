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

const FixBar = styled.div`
 height: 10vh;
  width: 100%;
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
function numberWithStyle (x) {
  x = x.toFixed(2)
  var number = (x.toString().replace('.', ',').replace(' ', ''))
  var resultNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return resultNumber
}

function formatDate(inputDate) {
  var date = inputDate.split("-")
  var year = date[0]
  var month = date[1]
  var day = date[2]
  return day + "/" + month + "/" + year
}

const ServicePay = () => {
  const alert = useAlert()
  const { register, handleSubmit, errors } = useForm()
  const {
    register: registerA,
    errors: errorsA,
    handleSubmit: handleSubmitA
  } = useForm()
  const [vendorName, setVendorName] = useState()
  const [serviceName, setServiceName] = useState()
  const [serviceId, setServiceId] = useState()
  const [due, setDue] = useState()
  const [vendorId, setVendorId] = useState()
  const [amount, setAmount] = useState()
  const [dueDateParameter, setDueDateParameter] = useState()
  const [acc, setAcc] = useState('')
  const [findService, setFindService] = useState(false)

  const items = []

  if (window.sessionStorage.getItem('userSavings') !== 'null') {
    items.push({ id: window.sessionStorage.getItem('userSavings'), value: 'CA ' + window.sessionStorage.getItem('userSavings') })
  }
  if (window.sessionStorage.getItem('userChecking') !== 'null') {
    items.push({ id: window.sessionStorage.getItem('userChecking'), value: 'CC ' + window.sessionStorage.getItem('userChecking') })
  }

  const onSubmit = (data) => {
    console.log(data)
    const searchService = serviceService.searchService(data)
    searchService
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          setServiceName(res.data.name)
          setServiceId(res.data.servicePaymentId)
          setDue(res.data.dueDateParameter)
          setVendorName(res.data.vendor.businessName)
          setAmount(res.data.amount)
          setDue(res.data.dueDate)
          setFindService(true)
        } else if (res.status === 404) alert.error('No existe el servicio o el mismo no está disponible para su pago.')
      })
      .finally(setVendorId(data.vendorId))
  }

  const onSubmitA = () => {
    const usernameFrom = window.sessionStorage.getItem('user')

    console.log(acc, serviceId, usernameFrom, vendorId)
    const payService = transactionService.payService(acc, serviceId, usernameFrom, vendorId)
    payService
      .then((response) => {
        if (response !== 'transactionError') {
          alert.success('Pago de servicio realizado con éxito ')
        } else {
          alert.error('Operación fallida. Chequee que la cuenta tenga el saldo suficiente para realizar la operación.')
        }
      })
  }
  return (
    <GlobalContainer id='globalContainer'>
      <Header id='header' />
      <Content id='content' url='background.png' direction='column'>
        <Text> Pago de servicios </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TableAlt>
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
                </tr>
                <tr>
                  <TableDataL><p> Fecha de vencimiento: </p></TableDataL>
                  <TableDataL>
                  <Input name='dueDateParameter' type='date' ref={register({ required: true, min: '1900-01-01', max: '2100-01-01' })} />
                  </TableDataL>
                  <TableDataL>
                  <TButton type='submit'>
                    Buscar
                  </TButton>
                </TableDataL>
                </tr>
            </tbody>
          </TableAlt>
        </form>
        {findService &&
          <form onSubmit={handleSubmitA(onSubmitA)}>
            <TableAlt>
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
                  <TableDataR> {'$ ' + numberWithStyle(amount)} </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Fecha de vencimiento: </TableDataL>
                  <TableDataR> {formatDate(due)} </TableDataR>
                </tr>
                <tr>
                  <TableDataL><p> Cuenta a debitar: </p></TableDataL>
                  <TableDataL><Dropdown title='Seleccione cuenta' items={items} updateParent={id => setAcc(id)} /></TableDataL>
                  <TableDataL><TButton type='submit'> Pagar </TButton></TableDataL>
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

export default ServicePay
