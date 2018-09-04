import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './styles.styl'

import Icon from '../Icon'

import appDefaultIcon from '../../assets/icons/ui/icon-cube.svg'

export class AppIcon extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      status: 'idle'
    }
  }

  async componentDidMount() {
    this.fetchIcon()
  }

  async fetchIcon() {
    const { app, fetchIcon } = this.props

    if (typeof fetchIcon !== 'function') {
      throw new Error('fetchIcon prop is required')
    }

    this.setState({ status: 'fetching' })

    try {
      const icon = await fetchIcon(app.links.icon)
      if (!icon) throw new Error('No app icon found/fetched')
      this.setState({ icon, status: 'done' })
    } catch (error) {
      this.setState({ error, status: 'failed' })
    }
  }

  render() {
    const { alt, className } = this.props
    const { icon, status } = this.state
    switch (status) {
      case 'idle':
      case 'fetching':
        return (
          <div
            className={classNames(
              styles['c-loading-placeholder'],
              styles['c-app-icon'],
              className
            )}
          />
        )
      case 'done':
        return (
          <img
            className={classNames(styles['c-app-icon'], className)}
            src={icon}
            alt={alt}
          />
        )
      case 'failed':
      default:
        return (
          <Icon
            className={(styles['c-app-icon'], styles['c-app-icon-default'])}
            height="100%"
            icon={appDefaultIcon}
            width="100%"
          />
        )
    }
  }
}

AppIcon.propTypes = {
  className: PropTypes.string,
  alt: PropTypes.string,
  fetchIcon: PropTypes.func.isRequired
}

export default AppIcon
