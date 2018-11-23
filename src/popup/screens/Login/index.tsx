import React, { Component } from 'react'
import feathersClient from '../../FeathersClient'

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
      <button onClick={this.onPressLogin}>Login</button>
    )
  }
}
