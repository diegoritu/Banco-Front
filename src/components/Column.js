import styled from 'styled-components'

const media = {
  xs: (styles) => `
  @media only screen and (max-width: 480px) {
    ${styles}
  }
  `
}

export default styled.div`
  display: flex;
  flex: ${(props) => props.size};
  height: 100vh;
  flex-direction: column;
  align-items: center;
  ${(props) => props.collapse && media[props.collapse]('display: none;')};
  

`
