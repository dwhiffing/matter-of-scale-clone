import React from "react"
import numeral from "numeral"
import Constants from 'utils/Constants'
import { markInstanceComplete } from "actions/InstanceActions"
import { mapStateKeysToProps } from 'utils/helpers'
import { connect } from 'react-redux'

const stateToConnect = mapStateKeysToProps(['properties'])
const format = (string, format) => {
  return numeral(string).format(format)
}

const PropertyView = React.createClass({
  render() {
    let {properties} = this.props
    let propertiesArr = Object.values(properties)
    let last

    return (
      <div className="properties-wrap">
        {propertiesArr.map((property, i) => {
          let lastClone = Object.assign({}, last)
          if (!lastClone || !property.unlocked) return false
          last = property

          const instances = property.instances().filter(i => !i.complete)
          const completed = property.instances().filter(i => i.complete)

          const clickResearch = () => {
            this.props.history.push(`/research/${property.id}`)
          }

          let next = lastClone.toCompleteUntilNextInstance

          return (
            <div className="px1 mb1 h2 black" key={i}>

              <span className="caps">
                {property.name}s
              </span>

              {i !== 0 &&
                <span className="h6 gray">
                  {next > 0 ? `(${lastClone.name}s til next ${property.name}: ${next})` : ""}
                </span>
              }

              {instances.length > 0 &&
                <div>
                  <div className="px1 h5 col col-6">
                    <span className={`${property.color} caps`}>
                      {property.currencyName}:
                    </span>
                    {format(property.money(), "0,0")} => {property.income()}/s
                  </div>

                  <div className="px1 h5 col col-6">
                    <span className={`${property.color} caps`}>
                      Upgrades:
                    </span>
                    {format(property.upgrades, "0,0.00")}
                  </div>

                  <div className="px1 h5 col col-6">
                    <span className={`${property.color} caps`}>
                      {property.researchName}:
                    </span>
                    {property.research}
                  </div>

                  <div className="px1 h5 col col-6">
                    <a onClick={clickResearch} className="m1 h4 blue">
                      research
                    </a>
                  </div>

                  <div className='px2 h3'>
                    Instances: (completed: {completed.length})
                  </div>

                  <ul className="px3 clearfix">
                    {instances.map((obj, i) => {

                      const clickInstance = () => {
                        this.props.history.push(`/instance/${obj.id}`)
                      }

                      const clickComplete = () => {
                        this.props.dispatch(markInstanceComplete(obj.id))
                      }

                      return (
                        <li key={i} className="bar-wrap col col-12 left-align">

                          <a onClick={clickInstance}>
                            {format(obj.money, "0,0")} => {obj.income()}/s
                          </a>

                          {obj.progress >= 100 || true &&
                            <span className="px1">
                              <span className="h5 px1">
                                {obj.autoComplete}/{obj.autoCompleteDuration()}
                              </span>
                              <button onClick={clickComplete}>
                                Complete Level
                              </button>
                            </span>
                          }

                        </li>
                      )
                    })}
                  </ul>
                </div>
              }

            </div>
          )
        })}
      </div>
    )
  }
})

export default connect(stateToConnect)(PropertyView)
