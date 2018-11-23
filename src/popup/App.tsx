import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import DashboardScreen from './screens/Dashboard'
import LoginScreen from './screens/Login'
import feathersClient from './FeathersClient'

class App extends Component {
  state = {
    user: feathersClient.user
  }

  componentDidMount () {
    feathersClient.authenticate()

    feathersClient.on('user', user => {
      this.setState({ user })
    })
  }

  render () {
    return (
      <Router>
        <div>
          <Route path='/' exact component={DashboardScreen} />
          <Route path='/login' component={LoginScreen} />

          <Redirect to={this.state.user ? '/' : '/login'} />
        </div>
      </Router>
    )
  }
}

export default App
