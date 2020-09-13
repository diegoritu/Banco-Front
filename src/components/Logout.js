import React, { useState } from 'react'
import styled from 'styled-components'
import auth from './Auth'
import { withRouter } from 'react-router-dom'

const DdWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  min-width: 50px;
  color:black;
  
`

const DdHeader = styled.div`
  background-color: #000;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
  padding: 0 20px;
  color: #fff;
  outline: none;
  height: 5vh;
  align-items: center;

`

const DdHeaderTitle = styled.div`
background: black;
`

const DdHeaderTitleBold = styled.span`
  margin-right: 10px;
`

const DdHeaderAction = styled.div`
`

const DdList = styled.ul`
  box-shadow: 0 .125rem .25rem rgba(0,0,0,.075);
  padding: 0;
  margin: 0;
  width: 100%;
  margin-top: 48px;
  position: absolute;
  z-index: 1;
  
`

const DdListItem = styled.li`
  list-style-type: none;
  width:100%;
  
  
  &:first-of-type {
    button {
      border-top: 1px solid #ccc;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
  }
  &:last-of-type {
    button {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    }
  }
  button {
    display: flex;
    justify-content: space-between;
    background-color: white;
    font-size: 16px;
    padding: 15px 20px 15px 20px;
    border: 0;
    border-bottom: 1px solid #ccc;
    width: 100%;
    text-align: left;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    &:hover, &:focus {
      cursor: pointer;
      background-color: #ccc;
    }
  }
`

const Logout = (props) => {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(!open)

  const handleOnClick = () => {
    auth.logout(() => { props.history.push('/') })
  }

  return (
    <DdWrapper>
      <DdHeader tabIndex={0} role='button' onKeyPress={() => toggle(!open)} onClick={() => toggle(!open)}>
        <DdHeaderTitle>
          <DdHeaderTitleBold>
            Juan
          </DdHeaderTitleBold>
        </DdHeaderTitle>
        <DdHeaderAction>
          <p>{open ? String.fromCharCode(9650) : String.fromCharCode(9660)}</p>
        </DdHeaderAction>
      </DdHeader>
      {open && (
        <DdList>
          <DdListItem>
            <button type='button' onClick={() => handleOnClick()}>
              <span>Logout</span>
            </button>
          </DdListItem>
        </DdList>
      )}

    </DdWrapper>

  )
}

export default withRouter(Logout)
