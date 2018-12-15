import { AnyAction } from 'redux'

const USER_SET = 'user/SET'
const USER_CLEAR = 'user/CLEAR'

export const set = user => {
  return {
    type: USER_SET,
    payload: user
  } as AnyAction
}

export const clear = () => {
  return {
    type: USER_CLEAR
  } as AnyAction
}

export default (state = null, action) => {
  switch (action.type) {
    case USER_SET:
      return action.payload
    case USER_CLEAR:
      return null
    default:
      return state
  }
}
