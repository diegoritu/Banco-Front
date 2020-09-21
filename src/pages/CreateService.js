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
import { Select2 } from "select2-react-component";

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  width: 20vw;
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
const CreateService = () => {
  const { register, handleSubmit, errors } = useForm()
  const alert = useAlert()
  const items = []
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

const getLegals = () => {
  console.log(userService.legals())
  return userService.legals()
}
  const [legals, setLegals] = React.useState([])

  React.useEffect(() => {
    getLegals().then(legals => setLegals())
  }, [])
  const renderLegals = () =>{
    return legals.map((item, index) => {
      return(
        <tr>
          <Select2 legals={legals}
            value={item.businessName}
            update={value => this.update(value)}>
          </Select2>
        </tr>
      );
    }
    );}
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
                {renderLegals()}
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
