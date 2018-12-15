import React, {Component, MouseEvent} from 'react'
import {connect} from 'react-redux'
import styles from './index.css'
import Popup from "../Popup";

interface RightMenuProps {
  user?: {
    photo: string
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

        </Popup>
      </div>
    )
  }
}

export default connect((state: any) => ({
  user: state.user
}))(RightMenu)
