import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { mapStateKeysToProps, format, titleify } from 'utils/helpers'

import * as InterfaceActions from 'actions/InterfaceActions'
import * as InstanceActions from 'actions/InstanceActions'
import * as BuildingActions from 'actions/BuildingActions'
import * as PropertyActions from 'actions/PropertyActions'

const stateToMap = mapStateKeysToProps([
  'ui',
  'properties',
  'instances',
  'buildings',
])

const actionsToMap = Object.assign({},
  InterfaceActions,
  PropertyActions,
  InstanceActions,
  BuildingActions
)

const ApplicationView = React.createClass({

  render() {
    const { instances, properties, params, children } = this.props

    let instance, property
    if (params.instance) {
      instance = instances[params.instance]
    }
    if (params.property) {
      property = properties[params.property]
    }

    return (
      <div className="container">

        <ol className="breadcrumb">
          <li><strong>Idle Game</strong></li>
          <li><a href="#/property">Properties</a></li>
          {instance &&
            <li className="active">
              <a href={`#/instance/${params.instance}`}>
                {titleify(instance.name)} {params.instance}
              </a>
            </li>
          }
          {property &&
            <li className="active"><a href={`#/research/${params.property}`}>
              {titleify(property.name)} Improvements
            </a></li>
          }
        </ol>

        {children && React.cloneElement(children, { ...this.props })}

        <nav className="navbar navbar-default navbar-fixed-bottom">
          <div className="container">
            <div className="row text-center" style={{ margin: '0 -10px' }}>

              <a className="col-xs-2" onClick={this.props.clearSave}>
                Clear Save
              </a>

              <Link className="col-xs-4" to="#/property">
                View Properties
              </Link>

              <a className="col-xs-4" onClick={() => this.props.changeUpgradePoints(0.05)}>
                Get Upgrades ({format(this.props.ui.upgrades,'0.00')}U)
              </a>

              <a className="col-xs-2" onClick={this.props.toggleMuliplier}>
                x{this.props.ui.multi} click
              </a>

            </div>
          </div>
        </nav>
      </div>
    )
  },
})

export default connect(stateToMap, actionsToMap)(ApplicationView)
