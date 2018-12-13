import React, { Component, MouseEvent } from 'react'
import classnames from 'classnames'
import styles from './index.css'

interface TabProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
  selected?: boolean,
}

export default class Tab extends Component<TabProps> {
  render () {
    const { children, onClick, selected } = this.props

    return (
      <button
        className={classnames(styles.tab, {
          [styles.selected]: selected
        })}
        onClick={onClick}
        >
        {children}
        </button>
    )
  }
}
