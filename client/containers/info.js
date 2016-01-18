'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {getInfo} from '../actions/info'

export const Info = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
  },

  componentDidMount () {
    const dispatch = this.props.dispatch
    const moduleName = this.props.params.moduleName

    dispatch(getInfo(moduleName))
  },

  render () {
    const moduleName = this.props.params.moduleName
    let body = null

    if (!this.props.result) {
      body = (
        <div className="alert alert-info alert-has-icon txt-left">
          <span className="icon icon-refresh-blue"></span>
          <p className="m0">Loading information. Please refresh the page.</p>
        </div>
      )
    }
    else {
      const {github, npm} = this.props.result

      body = (
        <div className="col-xs-12 col-sm-8 col-md-8 col-rg-6">
          <div className="module-header cf">
            <div className="row middle-xs">
              <h1 className="col-xs-12 col-sm-7 m0">{moduleName}</h1>
              <a href="/" className="col-xs-12 col-sm-5">← Back to search results</a>
            </div>
          </div>

          <div className="panel panel-module-info txt-left">
            <div className="panel-module">
              <h2 className="mt0"><span className="logo logo-npm"></span> npm</h2>
              <ul className="list-unstyled cf module-info-list">
                <li><strong className="module-info-heading">Tagline:</strong> {npm.desc}</li>
                <li><strong className="module-info-heading">Version:</strong> {npm.version}</li>
              </ul>
            </div>

            <div className="panel-module">
              <h2 className="mt0"><span className="logo logo-git"></span> Github</h2>

              <ul className="list-unstyled module-info-list cf">
                <li><strong className="module-info-heading">Created:</strong> {github.last}</li>
                <li><strong className="module-info-heading">URL:</strong><a href="#"> {npm.giturl}</a></li>
                <li><strong className="module-info-heading">Watches:</strong> {github.watches}</li>
                <li><strong className="module-info-heading">Forks:</strong> {github.forks}</li>
                <li><strong className="module-info-heading">Stars:</strong> {github.stars}</li>
              </ul>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="info">
        <div className="row center-xs">
          {body}
        </div>
      </div>
    )
  }
})

function mapStatesToProps (state) {

  return {
    result: state.info.result
  }
}

export default connect(mapStatesToProps)(Info)