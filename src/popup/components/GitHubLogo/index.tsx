import React, { Component } from 'react'
import classnames from 'classnames'
import Logo from './logo.svg'
import styles from './index.css'

interface GitHubLogoProps {
  height?: number,
  width?: number,
  animated?: boolean
}

export default class GitHubLogo extends Component<GitHubLogoProps> {
  static defaultProps = {
    height: 100,
    width: 100
  }

  render () {
    const { animated, height, width } = this.props

    return <Logo
      width={width}
      height={height}
      className={classnames({
        [styles.animated]: animated
      })}
    />
  }
}
