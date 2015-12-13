import React from "react"
import _ from "lodash"
import { connect } from 'react-redux'
import { mapStateKeysToProps } from 'utils/helpers'

import { InterfaceThunks } from "actions/InterfaceActions"
import { InstanceThunks } from "actions/InstanceActions"
import { BuildingThunks } from "actions/BuildingActions"
import { PropertyThunks } from "actions/PropertyActions"

const stateToMap = mapStateKeysToProps(['ui', 'properties', 'instances', 'buildings'])
const actionsToMap = Object.assign({}, InterfaceThunks, PropertyThunks, InstanceThunks, BuildingThunks)

const ApplicationView = React.createClass({

  componentDidMount() {
  },

  componentDidUpdate() {
    // TODO: This should be done in the InstanceReducer when incrementing the autoComplete time
    // However, it will require several other parts of the instance logic to be rewritten
    if (this.props.ui.tickTimeout && Object.keys(this.props.instances).length === 0) {
      this.props.createInstance(0)
    }
    let instances = Object.values(this.props.instances)
    let autoCompletedInstances = instances.filter(i => i.progress >= 100 && !i.complete && i.autoComplete >= i.autoCompleteDuration())
    autoCompletedInstances.forEach(i => this.props.markInstanceComplete(i.id))
  },

  render() {
    return (
      <div className="container" style={{marginBottom: 50}}>
        {this.props.children &&
          React.cloneElement(this.props.children, {...this.props})
        }

        <div className="fixed bottom-0 left-0 right-0 bg-white clearfix">

          <button className="col h6 m0 p1 col-1" onClick={this.props.clearSave}>
            Clear Save
          </button>

          {this.props.properties[1].unlocked || true &&
            <a className="col h6 m0 p1 col-8" onClick={() => this.props.history.push("/property")}>
              View Properties
            </a>
          }

          <button className="col h6 m0 p1 col-1" onClick={this.props.toggleMuliplier}>
            x{this.props.ui.multi}
          </button>

        </div>
      </div>
    )
  }
})

export default connect(stateToMap, actionsToMap)(ApplicationView)
