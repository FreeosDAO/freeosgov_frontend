export function SET_BALANCE (state, data) {
  if (_.has(data, 'balance')) {
    state.balance = data.balance
  } else {
    state.balance = 0
  }
}

export function SET_UNVEST_HISTORY (state, result) {
  if (result.length === 0) {
    state.unVestHistory = null
  } else {
    state.unVestHistory = result
  }
}

export function SET_UNVEST_PRECENTAGE (state, result) {
  if (result.length === 0) {
    state.unVestPercentage = 0
  } else {
    state.unVestPercentage = result
  }
}
