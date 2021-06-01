export default () => ({
  accountName: null,
  connecting: false,
  path: '/claim',
  claimInfo: {
    liquidInAccount: {
      balance: ''
    },
    stakedInfo: null,
    freeosInAccount: {
      balance: ''
    },
    freeosHoldingRequire: {
      tokens_required: 0
    },
    respMasterSwitch: '',
    respFreeosRecord: '',
    respStakeRequirement: '',
    respIsUserAlreadyClaimed: '',
    respAirKey: ''
  }
})
