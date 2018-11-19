import React, { Component } from 'react'
import styles from './App.css'

class App extends Component {
  render () {
    return (
      <div className={styles.App}>
        <header className={styles['App-header']}>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className={styles['App-link']}
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
        </header>
      </div>
    )
  }
}

export default App
