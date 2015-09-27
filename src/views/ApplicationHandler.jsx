import React from "react"
import { Link } from "react-router"
import { connect } from 'react-redux'
import { startTicking, stopTicking } from "actions/InterfaceActions"
import { mapStateKeysToProps } from 'utils/reduxHelpers'

const AppHandler = React.createClass({

  componentDidMount() {
    this.props.dispatch(startTicking())
    this.props.dispatch({type: "CREATE_INSTANCE", payload: 0})
  },
  
  render() {
    let classes = "col h6 m0 p1"

    return (
      <div className="container">

        {this.props.children &&
          React.cloneElement(this.props.children, {...this.props})
        }

        <div className="fixed bottom-0 left-0 right-0 bg-white clearfix">

          <button className={`${classes} col-3`} 
            onClick={() => this.props.dispatch({type: "CLEAR_SAVE"})}>
            
            Clear Save
          </button>

          <Link className={`${classes} col-8`} 
            to="/properties">
            
            View Properties
          </Link>

          <button className={`${classes} col-1`} 
            onClick={() => this.props.dispatch({type: "TOGGLE_MULTIPLIER"})}>
            
            x{this.props.ui.multi}
          </button>

        </div>

      </div>
    )
  }
})

export default connect(mapStateKeysToProps(['ui']))(AppHandler)
