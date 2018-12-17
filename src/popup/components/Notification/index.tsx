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
  getContrastColor (color) {
    color = color[0] === '#' ? color.slice(1) : color

    const brightness = (parseInt(color.slice(0, 2), 16) * 299 + parseInt(color.slice(2, 4), 16) * 587 + parseInt(color.slice(4, 6), 16) * 114) / 1000

    return brightness > 125 ? '#000' : '#fff'
  }

  stylizeString (message, params) {
    const element = params.url ? 'a' : 'span'
    const attributes: {[key: string]: string} = {}
    const css: {[key: string]: string} = {}
    const classNames: string[] = []

    if (params.color) {
      css.color = params.color
    }

    if (params.url) {
      attributes.href = params.url
      attributes.target = '_blank'
      classNames.push(styles.link)
    }

    if (params.background) {
      css.color = this.getContrastColor(params.background)
      css.background = params.background

      classNames.push(styles.background)
    }

    if (params.mono) {
      classNames.push(styles.mono)
    }

    if (params.italic) {
      classNames.push(styles.italic)
    }

    if (params.bold) {
      classNames.push(styles.bold)
    }

    message = `<${element} style="${Object.entries(css).reduce((s, [key, value]) => `${s}${key}:${value};`, '')}" class="${classNames.join(' ')}" ${Object.entries(attributes).reduce((s, [key, value]) => `${s} ${key}="${value}"`, '')}>${message}</${element}>`

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
