import React, { Component, MouseEvent } from 'react'
import classnames from 'classnames'
import styles from './index.css'

interface ButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
  primary?: boolean,
  className?: string
}

export default class Button extends Component<ButtonProps> {
  static defaultProps = {
    primary: false
  }

  render () {
    const { children, className, onClick, primary } = this.props

    return (
      <button
        className={classnames(styles.button, {
          [styles.primary]: primary,
          [className!]: className
        })}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }

}
