import feathersClient from '../../FeathersClient'
import { set } from '../reducers/notifications'

export const load = (events?: string[]) => {
  return (async (dispatch) => {
    const query: any = {}

    if (event) {
      query.event = {
        $in: events
      }
    }

    const notifications = await feathersClient.app.service('notifications').find({ query })

    dispatch(set(notifications.data))
  })
}
