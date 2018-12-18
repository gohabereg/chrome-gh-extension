import React, { Component } from 'react'
import styles from './index.css'
import Tab from '../Tab'
import Plus from './plus.svg'

interface ITab {
  title: string
  events: string[] // {[key: string]: string[] | boolean | undefined }
}

interface TabMenuProps {
  tabs: ITab[],
  defaultTab?: number,
  onTabPressed?: (i: number) => void,
  onPlusClicked?: () => void
}

export default class TabMenu extends Component<TabMenuProps> {
  static defaultProps = {
    defaultTab: 0
  }

  state = {
    selectedTab: 0
  }

  componentWillMount () {
    if (this.props.defaultTab) {
      this.setState({
        selectedTab: this.props.defaultTab
      })
    }
  }

  onTabSelected = (i) => {
    this.setState({
      selectedTab: i
    })

    if (this.props.onTabPressed) {
      this.props.onTabPressed(i)
    }
  }

  onPlusClicked = () => {
    this.setState({
      selectedTab: -1
    })

    if (this.props.onPlusClicked) {
      this.props.onPlusClicked()
    }
  }

  render () {
    return (
      <div className={styles.container}>
        {this.props.tabs.map((tab: ITab, i: number) => {
          return <Tab
            key={i}
            onClick={() => this.onTabSelected(i)}
            selected={this.state.selectedTab === i}
          >
            {tab.title}
          </Tab>
        })}
        {/*<Plus className={styles.plus} width={10} height={14} onClick={this.onPlusClicked} />*/}
      </div>
    )
  }
}
