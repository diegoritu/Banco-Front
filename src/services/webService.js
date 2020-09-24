const urlAPI = 'http://localhost:8080/bank-api'
const urlOrigin = 'http://localhost:3000'

const urlWebService = {
  getChecking: urlAPI + '/account/checking',
  getSavings: urlAPI + '/account/savings',
  modifyCheckingAccount: urlAPI + '/account/checking',
  newCheckingAccount: urlAPI + '/account/checking',
  closeCheckingAccount: urlAPI + '/account/checking/close-account',

  transferToOtherAccounts: urlAPI + '/movement/transferToOtherAccounts',
  transferBetweenOwnAccounts: urlAPI + '/movement/transferBetweenOwnAccounts',
  getMovements: urlAPI + '/movement/movements',
  getMovement: urlAPI + '/movement/movementById',
  extract: urlAPI + '/movement/extract',
  deposit: urlAPI + '/movement/deposit',

  createService: urlAPI + '/service-bill/create',
  searchService: urlAPI + '/service-bill/search',
  payService: urlAPI + '/movement/payServiceBill',

  getAdministrative: urlAPI + '/user/administrative',
  createPhysicalUser: urlAPI + '/user/physical',
  login: urlAPI + '/user/login',
  changePassword: urlAPI + '/user/changePassword',
  getPhysical: urlAPI + '/user/physical',
  getLegal: urlAPI + '/user/legal',
  getLegals: urlAPI + '/user/legals',
  createLegalUser: urlAPI + '/user/legal',
  searchPhysicalUser: urlAPI + '/user/physical/search',
  searchLegalUser: urlAPI + '/user/legal/search',
  getPhysical: urlAPI + '/user/physical',
  modifyPhysicalUser: urlAPI + '/user/physical/modify',
  modifyLegalUser: urlAPI + '/user/legal/modify'
}

export { urlWebService, urlOrigin }
