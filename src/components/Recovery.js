import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const RecoveryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RecoveryMsg = styled.span`

`
const RecoveryLink = styled(Link)`
  padding: 10px;

`

const Recovery = () => {
  return (
    <RecoveryWrapper>
      <RecoveryMsg>
      ¿No podes iniciar sesion?
      </RecoveryMsg>
      <Link to='/forgotPassword'>
        Recuperar clave
      </Link>
    </RecoveryWrapper>
  )
}

export default Recovery
