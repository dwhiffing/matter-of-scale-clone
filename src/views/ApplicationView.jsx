import React from "react"
import _ from "lodash"
import { connect } from 'react-redux'
import { mapStateKeysToProps, format, titleify } from 'utils/helpers'

import { InterfaceThunks } from "actions/InterfaceActions"
import { InstanceThunks } from "actions/InstanceActions"
import { BuildingThunks } from "actions/BuildingActions"
import { PropertyThunks } from "actions/PropertyActions"

const stateToMap = mapStateKeysToProps(['ui', 'properties', 'instances', 'buildings'])
const actionsToMap = Object.assign({}, InterfaceThunks, PropertyThunks, InstanceThunks, BuildingThunks)

const ApplicationView = React.createClass({

  componentDidUpdate() {
    // ensure there is always at least one hamlet
    if (this.props.ui.tickTimeout && Object.keys(this.props.instances).length === 0) {
      this.props.createInstance(0)
    }

    // TODO: This should be done in the InstanceReducer when incrementing the autoComplete time
    // However, it will require several other parts of the instance logic to be rewritten
    const instances = Object.values(this.props.instances)
    const autoCompletedInstances = instances.filter(i => {
      return i.progress >= 100 && !i.complete && i.autoComplete >= i.autoCompleteDuration()
    })
    autoCompletedInstances.forEach(i => this.props.markInstanceComplete(i.id))
  },

  render() {
    const { instances, params } = this.props

    let instance
    if (params.instance) {
      instance = instances[params.instance]
    }

    return (
      <div className="container">

        <ol className="breadcrumb">
          <li><a href="#/property">Properties</a></li>
          {instance &&
            <li className="active"><a href={`#/instance/${params.instance}`}>
              {titleify(instance.name)} {params.instance}
            </a></li>
          }
        </ol>

        {this.props.children &&
          React.cloneElement(this.props.children, {...this.props})
        }

        <nav className="navbar navbar-default navbar-fixed-bottom">
          <div className="container">
            <div className="row text-center" style={{margin: "0 -10px"}}>

              <a className="col-xs-2" onClick={this.props.clearSave}>
                Clear Save
              </a>

              <a className="col-xs-4" onClick={() => this.props.history.push("/property")}>
                View Properties
              </a>

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
  }
})

export default connect(stateToMap, actionsToMap)(ApplicationView)
