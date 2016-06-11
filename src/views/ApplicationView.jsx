import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { mapStateKeysToProps, format, titleify } from 'utils/helpers'

import { InterfaceThunks } from 'actions/InterfaceActions'
import { InstanceThunks } from 'actions/InstanceActions'
import { BuildingThunks } from 'actions/BuildingActions'
import { PropertyThunks } from 'actions/PropertyActions'

const stateToMap = mapStateKeysToProps(['ui', 'properties', 'instances', 'buildings'])
const actionsToMap = Object.assign({}, InterfaceThunks, PropertyThunks, InstanceThunks, BuildingThunks)

const ApplicationView = React.createClass({

  componentDidUpdate() {
    // ensure there is always at least one hamlet
    if (this.props.ui.doTickTimeout && Object.keys(this.props.instances).length === 0) {
      this.props.createInstance(0)
    }

    // TODO: This should be done in the InstanceReducer when incrementing the autoComplete time
    // However, it will require several other parts of the instance logic to be rewritten
    const instances = Object.values(this.props.instances)
    const autoCompletedInstances = instances.filter(i => {
      return i.progress >= 100 && i.autoComplete >= i.autoCompleteDuration()
    })
    autoCompletedInstances.forEach(i => this.props.markInstanceComplete(i.id))
  },

  render() {
    const { instances, properties, params } = this.props

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

        {this.props.children &&
          React.cloneElement(this.props.children, { ...this.props })
        }

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
