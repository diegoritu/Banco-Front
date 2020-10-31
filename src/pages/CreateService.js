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
import { serviceService } from '../services/serviceService'
import { userService } from '../services/userService'
import { useAlert } from 'react-alert'
import Dropdown from '../components/Dropdown'
import ReactFileReader from 'react-file-reader'

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  width: 20vw;
`
const FixBar = styled.div`
 height: 10vh;
  width: 100%;
`
const TableDataRw = styled.td`
  padding: 10px 20%;
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

const CreateService = () => {
  const { register, handleSubmit, errors } = useForm()
  const alert = useAlert()
  const [isLoading, setIsLoading] = useState(false)
  const [accountNumber, setAccountNumber] = useState('')
  const items = []
  var selectedItem = ''

  if (window.sessionStorage.getItem('userSavings') !== 'null') {
    items.push({ id: window.sessionStorage.getItem('userSavings'), value: 'CA ' + window.sessionStorage.getItem('userSavings') })
  }
  if (window.sessionStorage.getItem('userChecking') !== 'null') {
    items.push({ id: window.sessionStorage.getItem('userChecking'), value: 'CC ' + window.sessionStorage.getItem('userChecking') })
  }

  /* const handleFiles = (files) => {
    var reader = new FileReader();
    reader.onload = function(e) {
        // Use reader.result
        alert.info(reader.result)
    }
    reader.readAsText(files[0]);
  } */

  const onSubmit = (data) => {
    setIsLoading(true)
    var accountType = 'CHECKING'

    if (selectedItem.savings && selectedItem.savings.accountNumber === accountNumber) {
      accountType = 'SAVINGS'
    }
    console.log(data)
    var fileName = data.file[0].name.split('.')
    if (fileName.length !== 2) {
      alert.error('Archivo inválido')
      setIsLoading(false)
    } else if (fileName[1] !== 'csv') {
      alert.error('El archivo debe ser .csv')
      setIsLoading(false)
    } else if (accountNumber === '') {
      alert.error('Debe seleccionar una cuenta de cobro')
      setIsLoading(false)
    } else {
      const createService = serviceService.createService(data, accountType, window.sessionStorage.getItem('user'))
      createService
        .then((data) => {
          console.log(data)
          /* alert.success('¡Servicios creados con exito! El archivo con los identificadores se descargó correctamente.' )
          const element = document.createElement("a");
          var textToWrite = "Vendor Id: " + data.vendorId + "\n \nIds:\n# " + data.ids.toString().replace(/,/g, '\n# ');
          textToWrite = textToWrite.replace(/\n/g, "\r\n");
          const file = new Blob([textToWrite], {type: 'text/plain'});
          element.href = URL.createObjectURL(file);
          element.download = "Ids de Servicio.txt";
          document.body.appendChild(element);
          element.click(); */
        })
        .catch((message) => {
          alert.error(message)
        })
        .finally(() => setIsLoading(false))
    }
    // const createService = serviceService.createService(data, accountType, sessionStorage.getItem('user'))
    /* createService
      .then((data) => {
        alert.success('¡Servicios creados con exito! El archivo con los identificadores se descargó correctamente.' )
        const element = document.createElement("a");
        var textToWrite = "Vendor Id: " + data.vendorId + "\n \nIds:\n# " + data.ids.toString().replace(/,/g, '\n# ');
        textToWrite = textToWrite.replace(/\n/g, "\r\n");
        const file = new Blob([textToWrite], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "Ids de Servicio.txt";
        document.body.appendChild(element);
        element.click();
      })
      .catch((message) => {
        alert.error(message)
      })
      .finally(() => setIsLoading(false)) */
  }

  const getUser = () => {
    return userService.user('LEGAL')
  }

  const [user, setUser] = React.useState([])

  React.useEffect(() => {
    getUser().then(user => setUser(user))
  }, [])

  return (
    <GlobalContainer id='globalContainer'>
      <Header id='header' />
      <Content id='content' url='background.png' direction='column'>
        <Text> Creación de servicio </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TableAlt>
            <Caption> Crear Servicio </Caption>
            <tbody>
              <tr>
                <TableDataL> Servicio </TableDataL>
                <TableDataR>
                  <Input name='name' type='text' ref={register({ required: true })} />
                  {errors.name && <ErrorMsg> x </ErrorMsg>}
                </TableDataR>
              </tr>
              <tr>
                <TableDataL> Archivo con ids </TableDataL>
                <TableDataR>
                  <input name='file' type='file' accept='.csv' ref={register({ required: true })} />
                  {errors.file && <ErrorMsg> x </ErrorMsg>}
                </TableDataR>
              </tr>
              <tr>
                <TableDataL> Cuenta de pago </TableDataL>
                <TableDataRw>
                  <Dropdown title='Seleccione cuenta de pago' items={items} updateParent={value => setAccountNumber(value)} refs={register({ required: true })} />
                </TableDataRw>
              </tr>
              <tr>
                <TableDataL><TButton type='submit' disabled={isLoading}> Confirmar </TButton></TableDataL>
              </tr>
            </tbody>
          </TableAlt>
        </form>
        <FixBar />
      </Content>
      <Footer id='footer' />
    </GlobalContainer>
  )
}

export default CreateService
