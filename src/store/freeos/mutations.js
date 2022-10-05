export const setparametersTable = (state, parametersTable) => {
  state.parametersTable = parametersTable
}
export const setdparametersTable = (state, dparametersTable) => {
  state.dparametersTable = dparametersTable
}
export const setsystemRow = (state, systemRow) => {
  state.systemRow = systemRow
}
export const setcurrencies = (state, currencies) => {
  state.currencies = currencies
}

export const setmasterSwitch = (state, masterSwitch) => {
  state.masterSwitch = masterSwitch
}
export const setiterations = (state, iterations) => {
  state.iterations = iterations
}
export const setpriceLabel = (state, priceLabel) => {
  state.priceLabel = priceLabel
}

export const setuser = (state, user) => {
  state.user = user
}
export const setisAuthenticated = (state, isAuthenticated) => {
  state.isAuthenticated = isAuthenticated
}
export const setisFreeosEnabled = (state, isFreeosEnabled) => {
  state.isFreeosEnabled = isFreeosEnabled
}

export const setaccountName = (state, accountName) => {
  state.accountName = accountName
}
export const setaccountType = (state, accountType) => {
  state.accountType = accountType
}
export const setisRegistered = (state, isRegistered) => {
  state.isRegistered = isRegistered
}
export const setisVerified = (state, isVerified) => {
  state.isVerified = isVerified
}

export const setcurrentPrice = (state, currentPrice) => {
  state.currentPrice = currentPrice
}
export const settargetPrice = (state, targetPrice) => {
  state.targetPrice = targetPrice
}

export const setlockFactor = (state, lockFactor) => {
  state.lockFactor = lockFactor
}

export const setmintFeeMin = (state, mintFeeMin) => {
  state.mintFeeMin = mintFeeMin
}

//Survey mutations
export const setsurveyShare = (state, surveyShare) => {
  state.surveyShare = surveyShare
}
export const setvoteShare = (state, voteShare) => {
  state.voteShare = voteShare
}
export const setratifyShare = (state, ratifyShare) => {
  state.ratifyShare = ratifyShare
}
export const setsurveyCompleted = (state, surveyCompleted) => {
  state.surveyCompleted = surveyCompleted
}
export const setsurveyClosesIn = (state, surveyClosesIn) => {
  state.surveyClosesIn = surveyClosesIn
}
export const setsurveyPeriodActive = (state, surveyPeriodActive) => {
  state.surveyPeriodActive = surveyPeriodActive
}
export const setsurveyRecord = (state, surveyRecord) => {
  state.surveyRecord = surveyRecord
}
export const setvoteStartsIn = (state, voteStartsIn) => {
  state.voteStartsIn = voteStartsIn
}
export const setvoteClosesIn = (state, voteClosesIn) => {
  state.voteClosesIn = voteClosesIn
}
export const setvoteCompleted = (state, voteCompleted) => {
  state.voteCompleted = voteCompleted
}
export const setvotePeriodActive = (state, votePeriodActive) => {
  state.votePeriodActive = votePeriodActive
}
export const setratifyStartsIn = (state, ratifyStartsIn) => {
  state.ratifyStartsIn = ratifyStartsIn
}
export const setratifyCompleted = (state, ratifyCompleted) => {
  state.ratifyCompleted = ratifyCompleted
}
export const setratifyPeriodActive = (state, ratifyPeriodActive) => {
  state.ratifyPeriodActive = ratifyPeriodActive
}
export const setratifyClosesIn = (state, ratifyClosesIn) => {
  state.ratifyClosesIn = ratifyClosesIn
}
export const setrewardsCurrent = (state, rewardsCurrent) => {
  state.rewardsCurrent = rewardsCurrent
}
export const setrewardsPrevious = (state, rewardsPrevious) => {
  state.rewardsPrevious = rewardsPrevious
}

// Claim Mutations
export const setnextClaimIn = (state, nextClaimIn) => {
  state.nextClaimIn = nextClaimIn
}
export const setcurrentIteration = (state, currentIteration) => {
  state.currentIteration = currentIteration
}
export const seteligibleToClaim = (state, eligibleToClaim) => {
  state.eligibleToClaim = eligibleToClaim
}
export const setnextActivity = (state, nextActivity) => {
  state.nextActivity = nextActivity
}

export const setfreeosContract = (state, freeosContract) => {
  state.freeosContract = freeosContract
}
export const setxprContract = (state, xprContract) => {
  state.xprContract = xprContract
}
export const setusdContract = (state, usdContract) => {
  state.usdContract = usdContract
}

export const setannounceObj = (state, announceObj) => {
  state.announceObj = announceObj
}
