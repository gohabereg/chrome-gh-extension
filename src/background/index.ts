import feathersClient from './FeathersClient'

feathersClient.authenticate().catch(console.log)

const notifications = new Map()

const composeNotification = (data) => {
  const paramRegexp = /\[([a-z]+)\]/gi
  let { message } = data

  return message.replace(paramRegexp, (match: string, name: string) => {
    const params = data[name]

    return params.value
  })
}

chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.event === 'authentication') {
    feathersClient.authenticate()

    // Repeat authentication every day
    chrome.alarms.create('gh-notification-authenticate-alarm', {
      when: Date.now() + 24 * 60 * 60,
      periodInMinutes: 24 * 60
    })
  }
})

feathersClient.on('notification', (notification) => {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: notification.icon,
    title: notification.title,
    message: composeNotification(notification)
  }, (id) => notifications.set(id, notification))
})

chrome.notifications.onClicked.addListener((id) => {
  if (notifications.has(id)) {
    const notification = notifications.get(id)
    chrome.tabs.create({ url: notification.url })

    notifications.delete(id)
  }
})
