const urlAPI = 'https://krrl-bank.herokuapp.com/bank-api'
const urlOrigin = 'https://krrl-bank-front.herokuapp.com'

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
  modifyLegalUser: urlAPI + '/user/legal/modify',
  disableUser: urlAPI + '/user/disable-user',
  resetPassword: urlAPI + '/user/reset-password'
}

export { urlWebService, urlOrigin }
