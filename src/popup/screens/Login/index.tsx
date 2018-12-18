import React, { Component } from 'react'
import classnames from 'classnames'
import feathersClient from '../../FeathersClient'
import Button from '../../components/Button'
import GitHubLogo from '../../components/GitHubLogo'
import styles from './index.css'

export default class LoginScreen extends Component {
  state = {
    loading: false,
    error: false
  }

  onLogin = (url) => {
    try {
      const token = url!.split('/').pop()

      feathersClient.authenticate({
        strategy: 'jwt',
        accessToken: token
      })
    } catch (e) {
      this.setState({
        error: true
      }, () => {
        setTimeout(() => this.setState({ error: false }), 2000)
      })
    }

    this.setState({ loading: false })
  }

  onPressLogin = () => {
    this.setState({ loading: true })

    try {
      chrome.identity.launchWebAuthFlow({
        url: `${process.env.BACKEND_URL}/auth/github`,
        interactive: true
      }, this.onLogin)
    } catch (e) {
      console.log(e)
    }
  }

  render () {
    return (
      <div className={styles.container}>
        <div className={
          classnames(styles.notification, {
            [styles.notificationOpened]: this.state.error
          })
        }>
          Auth failed. Please, try again.
        </div>
        <GitHubLogo animated={this.state.loading} />
        <Button className={styles.button} onClick={this.onPressLogin} primary>Login with GitHub</Button>
      </div>
    )
  }
}
