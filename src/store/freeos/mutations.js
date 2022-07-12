export const setparametersTable = (state, parametersTable) => {
  state.parametersTable = parametersTable
}
export const setdparametersTable = (state, dparametersTable) => {
  state.dparametersTable = dparametersTable
}
export const setsystemRow = (state, systemRow) => {
  state.systemRow = systemRow
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
export const setaccountName = (state, accountName) => {
  state.accountName = accountName
}

export const setcurrentPrice = (state, currentPrice) => {
  state.currentPrice = currentPrice
}
export const settargetPrice = (state, targetPrice) => {
  state.targetPrice = targetPrice
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
export const setratificationStartsIn = (state, ratificationStartsIn) => {
  state.ratificationStartsIn = ratificationStartsIn
}
export const setratifyCompleted = (state, ratifyCompleted) => {
  state.ratifyCompleted = ratifyCompleted
}