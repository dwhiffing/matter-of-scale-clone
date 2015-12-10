import React from "react"
import { connect } from 'react-redux'
import { startTicking, stopTicking } from "actions/InterfaceActions"
import { completeInstance } from "actions/InstanceActions"
import { mapStateKeysToProps } from 'utils/reduxHelpers'

const AppHandler = React.createClass({

  componentDidMount() {
    this.props.dispatch(startTicking())
    this.props.dispatch({type: "CREATE_INSTANCE", payload: 0})
  },

  componentDidUpdate() {
    // This shouldnt go here but I don't know where else to put it
    let instances = this.props.instances
    instances = Object.keys(instances).map(i => instances[i])
    let autoCompletedInstances = instances.filter(i => i.autoComplete >= i.autoCompleteDuration())
    let dispatch = this.props.dispatch
    autoCompletedInstances.forEach(i => dispatch(completeInstance(i.id)))
  },

  render() {
    let classes = "col h6 m0 p1"

    const clickProperties = () => {
      this.props.history.push("/property")
    }

    const clickClearSave = () => {
      this.props.dispatch({type: "CLEAR_SAVE"})
    }

    const clickMulti = () => {
      this.props.dispatch({type: "TOGGLE_MULTIPLIER"})
    }

    return (
      <div className="container" style={{marginBottom: 50}}>
        {this.props.children &&
          React.cloneElement(this.props.children, {...this.props})
        }

        <div className="fixed bottom-0 left-0 right-0 bg-white clearfix">

          <button className="col h6 m0 p1 col-3" onClick={clickClearSave}>
            Clear Save
          </button>

          <a className="col h6 m0 p1 col-8" onClick={clickProperties}>
            View Properties
          </a>

          <button className="col h6 m0 p1 col-1" onClick={clickMulti}>
            x{this.props.ui.multi}
          </button>

        </div>
      </div>
    )
  }
})

export default connect(mapStateKeysToProps(['ui', 'properties', 'instances']))(AppHandler)
