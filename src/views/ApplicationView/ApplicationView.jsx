import BreadCrumbs from './components/BreadCrumbs'
import NavBar from './components/NavBar'
import React from 'react'
import { connect } from 'react-redux'
import { mapStateKeysToProps } from 'utils/helpers'

import * as InterfaceActions from 'actions/InterfaceActions'
import * as InstanceActions from 'actions/InstanceActions'
import * as BuildingActions from 'actions/BuildingActions'
import * as PropertyActions from 'actions/PropertyActions'

class ApplicationView extends React.Component {
  render() {
    const { instances, properties, params, children } = this.props
    const { upgrades, multi } = this.props.ui

    return (
      <div className="container">
        <BreadCrumbs
          instance={instances[params.instance]}
          property={properties[params.property]}
        />

        {children && React.cloneElement(children, { ...this.props })}

        <NavBar
          multi={multi}
          upgrades={upgrades}
          clearSave={this.props.clearSave}
          changeUpgradePoints={this.props.changeUpgradePoints}
          toggleMuliplier={this.props.toggleMuliplier}
        />
      </div>
    )
  }
}

const stateToMap = mapStateKeysToProps([
  'ui',
  'properties',
  'instances',
  'buildings',
])

const actionsToMap = Object.assign(
  {},
  InterfaceActions,
  PropertyActions,
  InstanceActions,
  BuildingActions
)

export default connect(
  stateToMap,
  actionsToMap
)(ApplicationView)
