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
  background: ${(props) => 'url("' + (props.url) + '")'};
  background-size: cover;
  ${(props) => props.collapse && media[props.collapse]('background: #f5f5f7;')};

`
