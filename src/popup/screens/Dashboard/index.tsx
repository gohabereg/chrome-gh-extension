import React, { Component } from 'react'
import styles from './index.css'
import Tab from '../../components/Tab'
import RightMenu from '../../components/RightMenu'
import Notification, { INotification } from '../../components/Notification'
import { connect } from 'react-redux'
import GitHubLogo from '../../components/GitHubLogo'
import Button from '../../components/Button'
import TabMenu from '../../components/TabMenu'
import TabSettings from '../../components/TabSettings'
import { load as loadNotifications } from '../../redux/thunks/notifications'

interface DashboardProps {
  notifications: INotification[],
  loadNotifications: (events?: string[]) => Promise<void>,
  user?: {
    installation?: number
  }
}

export class DashboardScreen extends Component<DashboardProps> {
  state = {
    settingsOpened: false,
    tabs: [
      {
        title: 'Pull Requests',
        events: ['pull_request', 'pull_request_review']
      },
      {
        title: 'Issues',
        events: ['issues']
      }
    ]
  }

  onTabPress = (i: number = 0) => {
    this.props.loadNotifications(this.state.tabs[i].events)
  }

  onCTAPress = () => {
    window.open('https://github.com/apps/activity-notifications', '_blank')
  }

  onPlusClicked = () => {
    this.setState({
      settingsOpened: true
    })
  }

  renderTabSettings () {
    return (
      <TabSettings />
    )
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

  renderDashboard () {
    const { user, notifications } = this.props

    if (this.state.settingsOpened) {
      return this.renderTabSettings()
    }

    if (user && !user.installation) {
      return this.renderInstallCTA()
    }

    if (notifications.length) {
      return this.renderNotifications()
    }

    return this.renderEmptyDashboard()
  }

  render () {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <TabMenu
            tabs={this.state.tabs}
            onTabPressed={this.onTabPress}
            onPlusClicked={this.onPlusClicked}
          />
          <RightMenu/>
        </div>
        <div className={styles.notifications}>
          {this.renderDashboard()}
        </div>
      </div>
    )
  }
}

export default connect(
  (state: any) => ({
    notifications: state.notifications || [],
    user: state.user
  }),
  {
    loadNotifications
  }
)(DashboardScreen)
