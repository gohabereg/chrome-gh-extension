import React, { Component } from 'react'
import styles from './index.css'
import Tab from '../../components/Tab'
import RightMenu from '../../components/RightMenu'
import Notification, { INotification } from '../../components/Notification'
import { connect } from 'react-redux'
import GitHubLogo from '../../components/GitHubLogo'
import Button from '../../components/Button'

interface DashboardProps {
  notifications: INotification[],
  user?: {
    installation?: number
  }
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

  onCTAPress = () => {
    window.open('https://github.com/apps/activity-notifications', '_blank')
  }

  renderInstallCTA () {
    return (
      <div className={styles.cta}>
        <p className={styles.ctaHint}>I nstall our GitHub App to start receive notifications</p>
        <Button onClick={this.onCTAPress} primary>Install</Button>
      </div>
    )
  }

  renderEmptyDashboard () {
    return (
      <div className={styles.emptyDashboard}>
        <GitHubLogo width={80} height={80} />
        <p className={styles.emptyHint}>No notifications yet</p>
      </div>
    )
  }

  renderNotifications () {
    return this.props.notifications.map((notification, i) => {
      return <Notification key={i} data={notification}/>
    })
  }

  render () {
    const { user, notifications } = this.props

    console.log(user)

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          {this.state.tabs.map((title: string, i: number) => {
            return <Tab key={i} onClick={() => this.onTabPress(i)} selected={i === this.state.currentTab}>{title}</Tab>
          })}
          <RightMenu/>
        </div>
        <div className={styles.notifications}>
          {user && !user.installation && this.renderInstallCTA()}
          {user && user.installation && notifications.length !== 0 && this.renderNotifications()}
          {user && user.installation && !notifications.length && this.renderEmptyDashboard()}
        </div>
      </div>
    )
  }
}

export default connect((state: any) => ({
  notifications: state.notifications || [],
  user: state.user
}))(DashboardScreen)
