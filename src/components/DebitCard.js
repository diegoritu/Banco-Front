import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom';
import { userService } from '../services/userService';

const Table = styled.table`
  width:60%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2%;
  margin-bottom: 2%;
  background: #fff;
  border: 1px solid black;
  border-collapse: collapse;
`

const TableRow = styled.tr`
  background: #1877f2;
  
`

const TableData = styled.td`
  border-bottom: 1px solid black;
  border-collapse: collapse;
  color: #fff;
  width: 20%;
  text-align: center;
  padding: 8px;
`

const TableHeader = styled.th`
  border: 1px solid black;
  border-collapse: collapse;
  padding: 8px;
  background: #000000;
  color: white;
`

const TButton = styled.button`
  width: 100%;
  height: 100%;
  background-color: #000;
  color: white;
  padding: 6px;
  border: none;
  :hover, :active {
    background-color: #646464;
  }
`

function numberWithStyle (x) {
  x = x.toFixed(2)
  var number = (x.toString().replace('.', ',').replace(' ', ''))
  var resultNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return resultNumber
}

const getUser = () => {
  return userService.user('PHYSICAL') 
}


const AccountTable = (props) => {
  const history = useHistory()

  const [data, setUser] = React.useState([])
  React.useEffect(() => {
    getUser().then(data => setUser(data))
  }, [])
  if(Object.keys(data).length !== 0){
    return (
      <Table>
        <tbody>
          <TableRow>
            <TableHeader> Número de tarjeta </TableHeader>
            <TableHeader> Vencimiento </TableHeader>
          </TableRow>
          <TableRow>
            <TableData>{data.debitCard.number}</TableData>
            <TableData>{data.debitCard.expirationDate}</TableData>
          </TableRow>
        </tbody>
      </Table>
    )
  }    
  else {
    return('')
  }

}

export default AccountTable
