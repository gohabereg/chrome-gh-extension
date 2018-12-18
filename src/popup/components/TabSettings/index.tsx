import React, { Component } from 'react'
import styles from './index.css'

interface TabSettingsProps {
  title?: string,
  events?: {
    [event: string]: {
      value: boolean,
      types: {[type: string]: boolean}
    }
  }
}

export default class TabSettings extends Component<TabSettingsProps> {
  static defaultProps = {
    title: '',
    events: {
      pull_request: {
        value: false,
        types: {
          opened: false,
          edited: false,
          closed: false,
          reopened: false,
          review_requested: false,
          review_request_removed: false,
          labeled: false,
          unlabeled: false,
          assigned: false,
          unassigned: false
        }
      },
      pull_request_review: {
        value: false,
        types: {
          submitted: false,
          edited: false,
          dismissed: false
        }
      }
    }
  }

  renderEventsFields () {
    const events = Object.entries(this.props.events!)

    return events.map(([name, event], i) => {
      const typesEntries = Object.entries(event.types)

      return (
        <fieldset key={i} >
          <input type='checkbox' name={name} checked={this.props.events![name].value} />
          <label htmlFor={name}>{name}</label>
          <div>
            <ul>
              {typesEntries.map(([type, state], j) => {
                return (
                  <li key={j}>
                    <input type='checkbox' name={`${name}:${type}`} checked={!!state} />
                    <label htmlFor={`${name}:${type}`}>{type}</label>
                  </li>
                )
              })}
            </ul>
          </div>
        </fieldset>
      )
    })

  }

  render () {
    return (
      <div className={styles.container}>
        <h3>New tab name</h3>
        <input className={styles.name} />
        <h3>Events</h3>
        {this.renderEventsFields()}
      </div>
    )
  }
}
