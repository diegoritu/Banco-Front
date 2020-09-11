import React, { useState } from 'react'
import Content from '../components/Content'
import Footer from '../components/Footer'
import GlobalContainer from '../components/GlobalContainer'
import Header from '../components/Header'
import Dropdown from '../components/Dropdown'
import { useForm } from 'react-hook-form'

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

const Transfer = props => {
  const { register, handleSubmit, errors } = useForm()
  const [originAcc, setOriginAcc] = useState('')
  const [destinationAcc, setDestinationAcc] = useState('')

  const onSubmit = (data) => {
    console.log(data)
    console.log(originAcc)
    console.log(destinationAcc)
  }
  return (
    <GlobalContainer id='globalContainer'>
      <Header id='header' />
      <Content id='content' direction='column'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <table>
            <caption> Transferencia de fondos </caption>
            <tbody>
              <tr>
                <td> Desde </td>
                <td><Dropdown title='Seleccione cuenta origen' items={items} updateParent={value => setOriginAcc(value)} /></td>
              </tr>
              <tr>
                <td> Hacia </td>
                <td><Dropdown title='Seleccione cuenta destino ' items={items} updateParent={value => setDestinationAcc(value)} /></td>
              </tr>
              <tr>
                <td> Importe </td>
                <td>
                  <input name='amount' type='number' min='0' step='any' ref={register({ required: true })} />
                  {errors.amount && <span> Debe ingresar un monto </span>}
                </td>
              </tr>
              <tr>
                <td><button type='submit'> Confirmar </button></td>
              </tr>
            </tbody>
          </table>
        </form>
      </Content>
      <Footer id='footer' />
    </GlobalContainer>
  )
}

export default Transfer
