import React from 'react'
import styled from 'styled-components'

const RecoveryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RecoveryMsg = styled.span`

`
const RecoveryLink = styled.a`

`

const Recovery = () => {
  return (
    <RecoveryWrapper>
      <RecoveryMsg>
      ¿No podes iniciar sesion?
      </RecoveryMsg>
      <RecoveryLink href=''>
        Recuperar clave
      </RecoveryLink>
    </RecoveryWrapper>
  )
}

export default Recovery
