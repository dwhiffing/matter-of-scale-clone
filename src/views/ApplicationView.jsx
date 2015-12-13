import React from "react"
import _ from "lodash"
import { connect } from 'react-redux'
import { mapStateKeysToProps, format } from 'utils/helpers'

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
    return (
      <div className="container" style={{marginBottom: 50}}>
        {this.props.children &&
          React.cloneElement(this.props.children, {...this.props})
        }

        <div className="fixed bottom-0 left-0 right-0 bg-white clearfix">

          <button className="col h6 m0 py2 col-3" onClick={this.props.clearSave}>
            Clear Save
          </button>

          <button className="col h6 m0 py2 col-3" onClick={() => this.props.history.push("/property")}>
            View Properties
          </button>

          <button className="col h6 m0 py2 col-4" onClick={() => {this.props.changeUpgradePoints(0.05)}}>
            Get U ({format(this.props.ui.upgrades,'0.00')}U)
          </button>

          <button className="col h6 m0 py2 col-2" onClick={this.props.toggleMuliplier}>
            x{this.props.ui.multi}
          </button>

        </div>
      </div>
    )
  }
})

export default connect(stateToMap, actionsToMap)(ApplicationView)
