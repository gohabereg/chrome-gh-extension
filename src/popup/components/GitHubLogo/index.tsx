import React, { Component } from 'react'
import classnames from 'classnames'
import Logo from './logo.svg'
import styles from './index.css'

interface GitHubLogoProps {
  animated?: boolean
}

export default class GitHubLogo extends Component<GitHubLogoProps> {
  render () {
    return <Logo
      width={100}
      eight={100}
      className={classnames({
        [styles.animated]: this.props.animated
      })}
    />
  }
}
