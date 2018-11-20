import React, { Component } from 'react'
import Auth from '../../auth'

export default class LoginScreen extends Component {
  onPressLogin = () => {
    const auth = new Auth()
    console.log(auth)
  }

  render () {
    return (
      <button onClick={this.onPressLogin}>Login</button>
    )
  }
}
