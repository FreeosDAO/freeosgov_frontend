import { connect } from 'src/utils/smartContractRequest'

export async function getClaimCalendar (state) {
  const result = await connect({
    json: true,
    code: process.env.AIRCLAIM_CONFIGURATION_CONTRACT,
    scope: process.env.AIRCLAIM_CONFIGURATION_CONTRACT,
    table: 'iterations',
    limit: 26
  })
  const currentTimeStamp = Math.floor((new Date()).getTime() / 1000)
  let nextCalendar = {
    iteration_number: 0
  }
  if (result.rows && result.rows.length) {
    result.rows.map((row, index) => {
      const startTimeStamp = row.start
      const endTimeStamp = row.end

      if (currentTimeStamp > startTimeStamp && currentTimeStamp < endTimeStamp) {
        state.commit('SET_CURRENT_CALENDAR', result.rows[index])
        if (result.rows.length === (index + 1)) {
          nextCalendar = result.rows[index + 1]
        } else {
          nextCalendar = null
        }
      }
    })
  }
  state.commit('SET_NEXT_CALENDAR', nextCalendar)
}
