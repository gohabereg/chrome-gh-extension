import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import DashboardScreen from './screens/Dashboard'
import LoginScreen from './screens/Login'

const user = undefined

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Route path='/' exact component={DashboardScreen} />
          <Route path='/login' component={LoginScreen} />

          <Redirect to={!user ? '/login' : '/'} />
        </div>
      </Router>
    )
  }
}

export default App
