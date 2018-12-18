import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import DashboardScreen from './screens/Dashboard'
import LoginScreen from './screens/Login'
import feathersClient from './FeathersClient'
import styles from './App.css'
import store from './redux/store'
import { set as setUser, clear as clearUser } from './redux/reducers/user'
import { add as addNotification } from './redux/reducers/notifications'

class App extends Component {
  state = {
    user: feathersClient.user
  }

  updateUser = (user) => {
    if (user !== null) {
      store.dispatch(setUser(user))
    } else {
      store.dispatch(clearUser())
    }
  }

  componentDidMount () {
    feathersClient.authenticate()

    feathersClient.on('user', this.updateUser)
    feathersClient.on('notification', (notification) => {
      store.dispatch(addNotification(notification))
    })

    store.subscribe(() => {
      const { user } = store.getState()

      this.setState({ user })
    })
  }

  render () {
    return (
      <Provider store={store}>
        <Router>
          <main className={styles.app}>
            <Route path='/' exact component={DashboardScreen} />
            <Route path='/login' component={LoginScreen} />

            <Redirect to={this.state.user ? '/' : '/login'} />
          </main>
        </Router>
      </Provider>
    )
  }
}

export default App
