import { AnyAction } from 'redux'

const NOTIFICATIONS_ADD = 'notifications/ADD'
const NOTIFICATIONS_SET = 'notifications/SET'
const NOTIFICATIONS_CLEAR = 'notifications/CLEAR'

export const set = notifications => {
  return {
    type: NOTIFICATIONS_SET,
    payload: notifications
  }
}

export const add = notification => {
  return {
    type: NOTIFICATIONS_ADD,
    payload: notification
  } as AnyAction
}

export const clear = () => {
  return {
    type: NOTIFICATIONS_CLEAR
  } as AnyAction
}

export default (state: any[] = [], action) => {
  switch (action.type) {
    case NOTIFICATIONS_ADD:
      const length = state.length

      return [action.payload, ...state.slice(0, Math.min(length, 9))]
    case NOTIFICATIONS_SET:
      return action.payload
    case NOTIFICATIONS_CLEAR:
      return []
    default:
      return state
  }
}
