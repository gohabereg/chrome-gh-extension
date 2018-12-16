import React, { Component } from 'react'
import styles from './index.css'

export interface INotification {
  icon?: string
  message: string
  [key: string]: {
    value: string
    url?: string
    background?: string
    color?: string
    mono?: boolean
    italic?: boolean
    bold?: boolean
  } | string | undefined
}

interface NotificationProps {
  data: INotification
}

export default class Notification extends Component<NotificationProps> {
  stylizeString (message, params) {
    if (params.url) {
      message = `<a class="${styles.link}" href="${params.url}" target="_blank">${message}</a>`
    }

    if (params.mono) {
      message = `<code class="${styles.mono}">${message}</code>`
    }

    if (params.italic) {
      message = `<i class="${styles.italic}">${message}</i>`
    }

    if (params.bold) {
      message = `<b class="${styles.bold}">${message}</b>`
    }

    if (params.background) {
      message = `<span style="background: ${params.background};">${message}</span>`
    }

    if (params.color) {
      message = `<span style="color: ${params.color}">${message}</span>`
    }

    return message
  }

  composeNotification (data): string {
    const paramRegexp = /\[([a-z]+)\]/gi
    let { message } = data

    return message.replace(paramRegexp, (match: string, name: string) => {
      const params = data[name]
      const value = this.stylizeString(params.value, params)

      return value
    })
  }

  render () {
    const { data } = this.props

    return (
      <div className={styles.notification}>
        <img className={styles.avatar} src={data.icon}/>
        <div className={styles.message} dangerouslySetInnerHTML={{ __html: this.composeNotification(data) }}/>
      </div>
    )
  }
}
