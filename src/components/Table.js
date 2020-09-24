import styled from 'styled-components'

const Table = styled.table`
  width:60%;
  @media only screen and (max-width: 480px) {
    width: 100%;
  }
  margin-left: auto;
  margin-right: auto;
  margin-top: 2%;
  margin-bottom: 2%;
  background: #fff;
  border-collapse: collapse;
`
const TButton = styled.button`
margin-top: 10px;
margin-bottom: 10px;
margin-left: 20%;
margin-right: auto;
background-color: #000;
border: none;
border-radius: 2px;
font-size: 20px;
color: #fff;
line-height: 48px;
:active, :hover
{
  background: #646464;
}
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

const Caption = styled.caption`
padding: 15px;
background-color: black;
color: white;
font-size: 14pt;
`


const TableHeader = styled.th`
  border-collapse: collapse;
  color: #FFF;
  width: 20%;
  text-align: center;
  padding: 8px;
  height: 5vh;
`
const TableHeaderRow = styled.tr`
  background: #000;
`

export {
  Table,
  Caption,
  TableHeaderRow,
  TableHeader,
  TableDataL,
  TableDataR,
  TButton
}
