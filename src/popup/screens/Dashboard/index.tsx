import React, { Component } from 'react'
import styles from './index.css'
import Tab from '../../components/Tab'

export default class DashboardScreen extends Component {
  state = {
    tabs: ['Pull Requests', 'Issues'],
    currentTab: 0
  }

  onTabPress (i: number = 0) {
    this.setState({
      currentTab: i
    })
  }

  render () {
    return <div className={styles.container}>
      <div className={styles.header}>
        {this.state.tabs.map((title: string, i: number) => {
          return <Tab key={i} onClick={() => this.onTabPress(i)} selected={i === this.state.currentTab}>{title}</Tab>
        })}

      </div>

      <div>

      </div>
    </div>
  }
}
