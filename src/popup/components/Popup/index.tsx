import React, { Component } from 'react'
import classnames from 'classnames'
import styles from './index.css'

interface PopupProps {
  opened?: boolean
  className?: string
}

export default class Popup extends Component<PopupProps> {

  render () {
    const { opened, className, children } = this.props

    return (
      <div className={
        classnames(styles.popup, {
          [styles.popupOpened]: opened,
          [className!]: className
        })
      }>
        {children}
      </div>
    )
  }
}
