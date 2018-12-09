import React, { Component } from 'react'
import feathersClient from '../../FeathersClient'
import Button from '../../components/Button'
import GitHubLogo from '../../components/GitHubLogo'

export default class LoginScreen extends Component {
  onPressLogin = () => {
    chrome.identity.launchWebAuthFlow({
      url: 'http://localhost:3030/auth/github',
      interactive: true
    }, (url) => {
      const token = url!.split('/').pop()

      feathersClient.authenticate({
        strategy: 'jwt',
        accessToken: token
      })
    })
  }

  render () {
    return (
      <div>
        <GitHubLogo />
        <Button onClick={this.onPressLogin} primary>Login</Button>
      </div>
    )
  }
}
