import React, { Component, MouseEvent } from 'react'
import classnames from 'classnames'
import styles from './index.css'

interface ButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
  primary: boolean
}

export default class Button extends Component<ButtonProps> {
  static defaultProps = {
    primary: false
  }

  render () {
    return (
      <button
        className={classnames(styles.button, {
          [styles.primary]: this.props.primary
        })}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    )
  }

}
