import React, { Component } from 'react'
import classnames from 'classnames'
import styles from './index.css'

interface PopupProps {
  opened?: boolean
  className?: string,
  onOutsideClick?: (target: HTMLElement) => void
}

export default class Popup extends Component<PopupProps> {

  private container: HTMLDivElement | null = null

  handleClickOutside = (event) => {
    if (!this.props.onOutsideClick || !this.props.opened) {
      return
    }

    if (this.container && !this.container.contains(event.target)) {
      this.props.onOutsideClick(event.target)
    }
  }

  componentDidMount () {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  render () {
    const { opened, className, children } = this.props

    return (
      <div
        ref={(ref) => this.container = ref}
        className={classnames(styles.popup, {
          [styles.popupOpened]: opened,
          [className!]: className
        })
      }>
        {children}
      </div>
    )
  }
}
