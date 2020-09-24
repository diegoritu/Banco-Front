import { urlWebService, urlOrigin } from './webService'

const account = (data) => {

  if(data === 'SAVINGS'){
    const requestOptions = {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Origin: urlOrigin
      }
    }
    return fetch(urlWebService.getSavings + '?accountNumber=' + window.sessionStorage.getItem('userSavings'), requestOptions)
      .then(response => 
        response.json().catch(err => {
          console.log('Looks like there was a problem. Status Code: ' + response.status)
          return {}
        })
        .then(data => ({
            data: data,
            status: response.status
        })
    ).then(res => {
        if (res.status === 404) {
          return {}
        }
        else {
          return res.data
        }
    }))
      .catch(error => console.log('Fetch Error :-S', error))
  }
  else{
      const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Origin: urlOrigin
        }
      }
      return fetch(urlWebService.getChecking + '?accountNumber=' + window.sessionStorage.getItem('userChecking'), requestOptions)
        .then(response => 
          response.json().catch(err => {
            console.log('Looks like there was a problem. Status Code: ' + response.status)
            return {}
          })
          .then(data => ({
              data: data,
              status: response.status
          })
      ).then(res => {
          if (res.status === 404) {
            return {}
          }
          else {
            return res.data
          }
      }))
        .catch(error => console.log('Fetch Error :-S', error))  
  }
}

export const accountService = { account }
