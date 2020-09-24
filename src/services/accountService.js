import { urlWebService, urlOrigin } from './webService'
import request from './requestHelper'

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

const modifyChecking = (data, accountNumber) => {
  const requestOptions = {
    method: 'PUT',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Origin: urlOrigin
    },
    body: JSON.stringify({ accountNumber: accountNumber, maxOverDraft: data.maxOverdraft })
  }  
  return request(urlWebService.modifyCheckingAccount, requestOptions)
}

const openChecking = (data, username) => {
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Origin: urlOrigin
    },
    body: JSON.stringify({ maxOverdraft: data.maxOverdraft, username: username })
  }  
  return request(urlWebService.newCheckingAccount, requestOptions)
}

const closeChecking = (username) => {
  const requestOptions = {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Origin: urlOrigin
    }
  }
  return fetch(urlWebService.closeCheckingAccount + '?username=' + username, requestOptions)
    .then(response => 
      response.json().catch(err => {
        console.log('Looks like there was a problem. Status Code: ' + response.status)

        if(response.status === 409){
          return 'balanceError'
        }
      })
      .then(data => ({
          data: data,
          status: response.status
      })
  ).then(res => {
      if(response.status === 409){
        return 'balanceError'
      }
      else {
        return res.data
      }
  }))
    .catch(error => console.log('Fetch Error :-S', error))

}

export const accountService = { account, modifyChecking, openChecking, closeChecking }
