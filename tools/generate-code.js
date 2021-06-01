var definition =  {
    currentIteration: null,
    nextIteration: null,
    user : null,
    isRegistered : null,
    statistics: null,
    unvests : null,
    canUnvest : null,
  bcStateRequirements : null,

  XPRBalance: null,
  bcUnstaking : null,
  vestedOptions : null,
  liquidFreeos : null,
  airkeyBalance : null,
  liquidOptions : null,

  stakeRequirement : null,
  userHasStaked: null,
  userClaimedAlready : null,
  userMeetsStakeRequirement : null,
  totalFreeos : null,
  canClaim : null,
  isFreeosEnabled : null,
  userStake : null
};



for (const key in definition) {
    if (definition.hasOwnProperty(key)) {
        var getterMethod = `export const ${key} = ({ ${key} }) => ${key};`
        console.log(getterMethod);
    }
  }

  for (const key in definition) {
    if (definition.hasOwnProperty(key)) {
        var mutationMethod = `export const set${key} = (state, ${key}) => {
            state.${key} = ${key}
          }`
        console.log(mutationMethod);
    }
  }




  
