import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import DashboardScreen from './screens/Dashboard'
import LoginScreen from './screens/Login'
import feathersClient from './FeathersClient'
import styles from './App.css'

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
        <main className={styles.app}>
          <Route path='/' exact component={DashboardScreen} />
          <Route path='/login' component={LoginScreen} />

          <Redirect to={this.state.user ? '/' : '/login'} />
        </main>
      </Router>
    )
  }
}

export default App
