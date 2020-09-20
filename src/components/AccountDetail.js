import React from 'react'
import styled from 'styled-components'
import { accountService } from '../services/accountService'
import { useHistory } from 'react-router-dom';

const Table = styled.table`
  width:60%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2%;
  margin-bottom: 2%;
  background: #2a2a2a;
  border-collapse: collapse;
`

const TableRow = styled.tr`
  background: #2a2a2a;
  
`

const TableDataLUP = styled.td`
  color: #fff;
  width: 20%;
  text-align: left;
  font-size: 14pt;
  padding: 8px;
`
const TableDataLDW = styled.td`
  color: #2c94ff;
  width: 20%;
  text-align: left;
  font-size: 18pt;
  padding: 8px;
`
const TableDataRUP = styled.td`
  color: #fff;
  width: 20%;
  text-align: right;
  font-size: 14pt;
  padding: 8px;
`
const TableDataRDW = styled.td`
  color: #fff;
  width: 20%;
  text-align: right;
  padding: 8px;
  font-size: 18pt;
`


function numberWithStyle (x) {
  x = x.toFixed(2)
  var number = (x.toString().replace('.', ',').replace(' ', ''))
  var resultNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return resultNumber
}

const getAccount = (accountType) => {
  return accountService.account(accountType)
}


const AccountTable = (props) => {
  const history = useHistory()


  const [data, setAccount] = React.useState([])
  React.useEffect(() => {
    getAccount(props.accountType).then(data => setAccount(data))
  }, [])
  if(Object.keys(data).length !== 0){
    return (
      <Table>
        <tbody>
          <TableRow>
            <TableDataLUP>{data.accountType === 'CHECKING' ? 'Cuenta corriente' : 'Caja de ahorro'}</TableDataLUP>
            <TableDataRUP>Saldo disponible</TableDataRUP>
          </TableRow>
          <TableRow>
            <TableDataLDW>{data.accountNumber}</TableDataLDW>
            <TableDataRDW>{'$ ' + numberWithStyle(data.balance)}</TableDataRDW>
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
