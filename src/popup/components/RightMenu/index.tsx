import React, { Component } from 'react'
import { connect } from 'react-redux'
import feathersClient from '../../FeathersClient'
import styles from './index.css'
import Popup from '../Popup'

interface RightMenuProps {
  user?: {
    photo: string
    username: string
    profileUrl: string
  }
  width?: number
  height?: number
}

export class RightMenu extends Component<RightMenuProps> {
  static defaultProps = {
    width: 20,
    height: 20
  }

  state = {
    opened: false
  }

  onPressRightMenu = () => {
    this.setState({ opened: !this.state.opened })
  }

  onLogout = () => {
    feathersClient.logout()
  }

  render () {
    const { user, width, height } = this.props

    return (
      <div className={styles.container}>
        <button
          className={styles.button}
          onClick={this.onPressRightMenu}
        >
          <img src={user ? user.photo : ''} width={width} height={height}/>
          <span className={styles.dropdown} />
        </button>
        <Popup opened={this.state.opened} className={styles.popup} >
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <a href={user ? user.profileUrl : ''} target='_blank'>
              <p className={styles.p}> Signed in as</p>
              <b>
                <p className={styles.p}>{user ? user.username : ''}</p>
              </b>
              </a>
            </li>
            <li className={styles.dropdownDivider}> </li>
            <li className={styles.listItem}>Settings</li>
            <li className={styles.listItem} onClick={this.onLogout}>Sign out</li>
          </ul>
        </Popup>
      </div>
    )
  }
}

export default connect((state: any) => ({
  user: state.user
}))(RightMenu)
