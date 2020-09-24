import { urlWebService, urlOrigin } from './webService'
import request from './requestHelper'

const login = (data) => {
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Origin: urlOrigin
    },
    body: JSON.stringify({ password: data.password, username: data.username })
  }
  return fetch(urlWebService.login, requestOptions)
    .then(response => 
      response.json().catch(err => {
        console.log('Looks like there was a problem. Status Code: ' + response.status)
        return 'Error'
      })
      .then(data => ({
          data: data,
          status: response.status
      })
    ).then(res => {
      if (res.status === 409) {
        logout()
        console.log('Looks like there was a problem. Status Code: ' + response.status)
        return 'Error'
      }
      else {
        window.sessionStorage.setItem('user', res.data.username)
        window.sessionStorage.setItem('userType', res.data.userType)
        window.sessionStorage.setItem('userName', res.data.userType === 'LEGAL' ? res.data.businessName : (res.data.lastName + ', ' + res.data.firstName))
        window.sessionStorage.setItem('userSavings', (res.data.savings ? res.data.savings.accountNumber : null))
        window.sessionStorage.setItem('userChecking', (res.data.checking ? res.data.checking.accountNumber : null))

        if (res.status === 200 && (res.data.userType === 'PHYSICAL' || res.data.userType === 'LEGAL')) return '/home'
        if (res.data.userType === 'ADMINISTRATIVE') return '/adminHome'
        if (res.status === 202) return '/password'
      }
  }))
    .catch(error => console.log('Fetch Error :-S', error))
}

function logout () {
  window.sessionStorage.removeItem('user')
  window.sessionStorage.removeItem('userType')
  window.sessionStorage.removeItem('userName')
  window.sessionStorage.removeItem('userSavings')
  window.sessionStorage.removeItem('userChecking')

}

const changePassword = (data) => {
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Origin: urlOrigin
    },
    body: JSON.stringify({ password: data.password, username: window.sessionStorage.getItem('user') })
  }
  return fetch(urlWebService.changePassword, requestOptions)
    .then(response => {
      if (response.status === 409) {
        console.log('Looks like there was a problem. Status Code: ' + response.status)
      }
      else {
        if (window.sessionStorage.getItem('userType') === 'PHYSICAL' || window.sessionStorage.getItem('userType') === 'LEGAL') return '/home'
        if (window.sessionStorage.getItem('userType') === 'ADMINISTRATIVE') return '/adminHome'
      }
  })
    .catch(error => console.log('Fetch Error :-S', error))
}

const legals = ()=>{
  const requestOptions = {
    method: 'GET',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Origin: urlOrigin
    }
  }
  return fetch(urlWebService.getLegals, requestOptions)
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

const user = (data) => {

  if(data === 'PHYSICAL'){
    const requestOptions = {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Origin: urlOrigin
      }
    }
    return fetch(urlWebService.getPhysical + '?username=' + window.sessionStorage.getItem('user'), requestOptions)
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
  else if(data === 'LEGAL'){
      const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Origin: urlOrigin
        }
      }
      return fetch(urlWebService.getLegal + '?username=' + window.sessionStorage.getItem('user'), requestOptions)
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
    return fetch(urlWebService.getAdministrative + '?username=' + window.sessionStorage.getItem('user'), requestOptions)
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


const registerPhysicalUser = (data) => {
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Origin: urlOrigin
    },
    body: JSON.stringify({
        "address": data.address,
        "birthDate": data.birthDate,
        "cuitCuilCdi": data.cuitCuil,
        "dni": data.dni,
        "firstName": data.firstName,
        "lastName": data.lastName,
        "mobilePhone": data.mobilePhone,
        "phone": data.phone,
        "username": data.username,
        "withCheckingAccount": data.withCheckingAccount,
        "maxOverdraft": data.maxOverdraft,
      })
  }

  return request(urlWebService.createPhysicalUser, requestOptions)
}

const registerLegalUser = (data) => {
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Origin: urlOrigin
    },
    body: JSON.stringify({
        "address": data.addressLegalEntity,
        "businessName": data.businessName,
        "cuitCuilCdi": data.cuitCuilLegalEntity,
        "phone": data.phoneLegalEntity,
        "username": data.usernameLegalEntity,
        "withCheckingAccount": data.withCheckingAccountLegalEntity,
        "maxOverdraft": data.maxOverdraftLegalEntity
      })
  }

  return request(urlWebService.createLegalUser, requestOptions)
}


export const userService = { login, logout, changePassword, user, registerPhysicalUser, registerLegalUser, legals }
