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
  flex-wrap: wrap;
  flex-direction: ${(props) => props.direction};
  background: ${(props) => props.url ? 'url("' + (props.url) + '")' : '#f5f5f7'};
  background-size: cover;
  ${(props) => props.collapse && media[props.collapse]('background: #f5f5f7;')};
  min-height: 95vh;
  overflow: auto;

`
