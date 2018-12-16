import React, { Component } from 'react'
import styles from './index.css'
import Tab from '../../components/Tab'
import RightMenu from '../../components/RightMenu'
import Notification, { INotification } from '../../components/Notification'
import { connect } from 'react-redux'

interface DashboardProps {
  notifications: INotification[]
}

export class DashboardScreen extends Component<DashboardProps> {
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
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          {this.state.tabs.map((title: string, i: number) => {
            return <Tab key={i} onClick={() => this.onTabPress(i)} selected={i === this.state.currentTab}>{title}</Tab>
          })}
          <RightMenu/>
        </div>
        <div>
          {this.props.notifications.map((notification, i) => {
            return <Notification key={i} data={notification}/>
          })}
        </div>
      </div>
    )
  }
}

export default connect((state: any) => ({
  notifications: state.notifications || [{
    icon: 'https://avatars2.githubusercontent.com/u/28855787?v=4',
    user: {
      value: 'ElenaOstrikova',
      url: 'https://github.com/ElenaOstrikova'
    },
    reviewer: {
      value: 'gohabereg',
      url: 'https://github.com/gohabereg'
    },
    pr: {
      value: 'Dashboard screen',
      url: 'https://github.com/gohabereg/chrome-gh-extension/pull/3'
    },
    message: '[user] requested [reviewer]`s review for the «[pr]» pull request'
  }]
}))(DashboardScreen)
