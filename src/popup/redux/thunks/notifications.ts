import feathersClient from '../../FeathersClient'
import { set } from '../reducers/notifications'

export const load = () => {
  return (async (dispatch) => {
    const notifications = await feathersClient.app.service('notifications').find()

    dispatch(set(notifications.data))
  })
}
