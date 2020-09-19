const urlAPI = 'http://localhost:8080/bank-api'

const urlWebService = {
  login: urlAPI + '/user/login',
  changePassword: urlAPI + '/user/changePassword',
  getSavings: urlAPI + '/account/savings',
  getChecking: urlAPI + '/account/checking'
}

export default urlWebService
