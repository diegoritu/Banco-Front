import React, { useState } from 'react'
import Content from '../components/Content'
import Footer from '../components/Footer'
import GlobalContainer from '../components/GlobalContainer'
import Header from '../components/Header'
import Dropdown from '../components/Dropdown'
import { useForm } from 'react-hook-form'
import Text from '../components/Text'
import styled from 'styled-components'

const items = [
  {
    id: 1,
    value: 'foo'
  },
  {
    id: 2,
    value: 'bar'
  }
]

const Table = styled.table`
  width:60%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2%;
  margin-bottom: 2%;
  background: #fff;
  border-collapse: collapse;
`

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  width: 20vw;
`

const TButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 10px;
  margin: 0px;
`

const TableDataR = styled.td`
  border-collapse: collapse;
  color: #000;
  width: 20%;
  text-align: center;
  padding: 8px;
  height: 5vh;
`

const TableDataL = styled.td`
  border-collapse: collapse;
  color: #000;
  width: 10%;
  text-align: center;
  padding: 8px;
  height: 5vh;
`

const ErrorMsg = styled.span`
  color: red;
  font-size: 12px;
  margin-top: -5px;
  align-self: flex-start;
`

const Caption = styled.caption`
padding: 15px;
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

const Transfer = props => {
  const { register, handleSubmit, errors } = useForm()
  const [originAcc, setOriginAcc] = useState('')
  const [destinationAcc, setDestinationAcc] = useState('')
  const [originAccToNotOwned, setOriginAccToNotOwned] = useState('')
  const [ownedAcc, setOwnedAcc] = useState(true)

  const onSubmitOwned = (data) => {
    console.log(data)
    console.log(originAcc)
    console.log(destinationAcc)
  }
  const onSubmitNotOwned = (data) => {
    console.log(data)
    console.log(originAccToNotOwned)
  }
  return (
    <GlobalContainer id='globalContainer'>
      <Header id='header' />
      <Content id='content' direction='column'>
        <Text> Tipo de transferencia </Text>
        <ToggleWrapper>
          <Button onClick={() => setOwnedAcc(true)}> Entre cuentas propias </Button>
          <Button onClick={() => setOwnedAcc(false)}> Hacia otras cuentas </Button>
        </ToggleWrapper>

        {ownedAcc &&
          <form onSubmit={handleSubmit(onSubmitOwned)}>
            <Table>
              <Caption> Transferencia de fondos </Caption>
              <tbody>
                <tr>
                  <TableDataL> Desde </TableDataL>
                  <TableDataR><Dropdown title='Seleccione cuenta origen' items={items} updateParent={value => setOriginAcc(value)} /></TableDataR>
                </tr>
                <tr>
                  <TableDataL> Hacia </TableDataL>
                  <TableDataR><Dropdown title='Seleccione cuenta destino ' items={items} updateParent={value => setDestinationAcc(value)} /></TableDataR>
                </tr>
                <tr>
                  <TableDataL> Importe </TableDataL>
                  <TableDataR>
                    <Input name='amountToOwned' type='number' min='0' step='any' ref={register({ required: true })} />
                    {errors.amountToOwned && <ErrorMsg> Debe ingresar un monto </ErrorMsg>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL><TButton type='submit'> Confirmar </TButton></TableDataL>
                </tr>
              </tbody>
            </Table>
          </form>}
        {!ownedAcc &&
          <form onSubmit={handleSubmit(onSubmitNotOwned)}>
            <Table>
              <Caption> Transferencia hacia otra cuenta </Caption>
              <tbody>
                <tr>
                  <TableDataL> Cuenta Origen </TableDataL>
                  <TableDataR><Dropdown title='Seleccione cuenta origen' items={items} updateParent={value => setOriginAccToNotOwned(value)} /></TableDataR>
                </tr>
                <tr>
                  <TableDataL> CBU </TableDataL>
                  <TableDataR>
                    <Input name='cbu' ref={register({ required: true })} />
                    {errors.cbu && <span> Debe ingresar un cbu </span>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Referencia </TableDataL>
                  <TableDataR>
                    <Input name='reference' ref={register({ required: true })} />
                    {errors.reference && <span> Debe ingresar una referencia </span>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL> Importe </TableDataL>
                  <TableDataR>
                    <Input name='amountToNotOwned' type='number' min='0' step='any' ref={register({ required: true })} />
                    {errors.amountToNotOwned && <span> Debe ingresar un monto </span>}
                  </TableDataR>
                </tr>
                <tr>
                  <TableDataL><TButton type='submit'> Confirmar </TButton></TableDataL>
                </tr>
              </tbody>
            </Table>
          </form>}
      </Content>
      <Footer id='footer' />
    </GlobalContainer>
  )
}

export default Transfer
