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
import Select from 'react-select'
import Dropdown from '../components/Dropdown'

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  width: 20vw;
`

const SelectLegal = styled(Select)`
  width: 20vw;
  margin: auto;
`

const TableRow = styled.tr`
background-color: #FFF;  
border-bottom: 1px solid black;
:active, :hover
{
  background: #e9e9e9;
}
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
const TableDataRw = styled.td`
  padding: 10px 20%;
`

function loadLegalSelect(legals)
{
  var legalArray = []
  
  legals.forEach((item, index) => {
    legalArray.push({value: item.id, label: item.businessName})
  })

  return legalArray

}

const CreateService = () => {
  const { register, handleSubmit, errors } = useForm()
  const alert = useAlert()
  const [isLegal, setIsLegal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [originAcc, setOriginAcc] = useState('')
  const [legalSelected, setlegalSelected] = useState(null)
  const [accounts, setAccounts] = useState([])

  const onChangeLegalField = (legalSelected) => {
    var accs = []
    legals.forEach((item, index) => {
      if(item.id === legalSelected.value){
        if(item.savings != null){
          accs.push({value: "CA " + item.savings.accountNumber , id:  item.savings.accountNumber})
        }
        if(item.checking != null){
          accs.push({value: "CC " + item.checking.accountNumber, id:  item.checking.accountNumber})
        }
      }
    })
    setlegalSelected(legalSelected)
    setAccounts(accs)
  }

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

  const accountLoader = () => {
    legals.forEach((item, index) => {
      if(item.id === legalSelected.value){
        if(item.checking != null){
          accounts.push({value: "Cuenta Corriente", label:  item.checking.accountNumber})
        }
        if(item.savings != null){
          accounts.push({value: "Caja de Ahorro", label:  item.savings.accountNumber})
        }
    }
    })
  }

const getLegals = () => {
  return userService.legals()
}

const getAccounts = () => {
  return accounts
}
  const [legals, setLegals] = React.useState([])

  React.useEffect(() => {
    getLegals().then(legals => setLegals(legals))

  }, [])

  return (
    <GlobalContainer id='globalContainer'>
      <Header id='header' />
      <Content id='content' direction='column'>
        <Text> Creación de servicio </Text>
        
          <form onSubmit={handleSubmit(onSubmit)}>
            <Table>
              <Caption> Crear Servicio </Caption>
              <tbody>
                <tr>
                  <TableDataL> Servicio </TableDataL>
                  <TableDataR>
                    <Input name='service' type='text' ref={register({ required: true, pattern: /^[A-Z][a-z]+(?:[ -][A-Z][a-z]+)*$/ })} />
                    {errors.service && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Cantidad de códigos </TableDataL>
                  <TableDataR>
                    <Input name='amountOfCodes' type='number' min="1" ref={register({ required: true})} />
                    {errors.amountOfCodes && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Monto </TableDataL>
                  <TableDataR>
                  <Input name='amount' type='number' min="0" step='any' ref={register()} />
                    {errors.amount && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                <TableDataL> Fecha de vencimiento </TableDataL>
                  <TableDataR>
                    <Input name='due' type='date' ref={register({ required: true, min: '1900-01-01', max: '2100-01-01' })} />
                    {errors.due && <ErrorMsg> x </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Dueño del servicio </TableDataL>
                  <TableDataR>
                    <SelectLegal value ={legalSelected} options={loadLegalSelect(legals)} onChange={onChangeLegalField} />
                  </TableDataR>
                </tr>
                {legalSelected ?<tr>
                    <TableDataL> Cuenta de pago </TableDataL>
                    <TableDataRw><Dropdown title='Seleccione cuenta de pago' items={getAccounts()} updateParent={value => setOriginAcc(value)} /></TableDataRw>
                  </tr> : <tr></tr>}
                <tr>
                  <TableDataL><TButton type='submit' disabled={isLoading}> Confirmar </TButton></TableDataL>
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

export default CreateService
