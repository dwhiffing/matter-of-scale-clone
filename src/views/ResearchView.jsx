import React from "react"
import { buyResearch } from "actions/PropertyActions"
import cx from "classnames"
import { format as f } from "utils/helpers"

export default React.createClass({
  render() {
    const property = this.props.properties[this.props.params.property]
    return (
      <div>
        <div className="h2 bold center p2">
          {property.name.toUpperCase()} RESEARCH
        </div>

        {Object.keys(property.researchTypes).map((name, i) => {
          const research = property.researchTypes[name]
          const isComplete = property.researchComplete(name)

          return (
            <div key={i}
              className={cx("p1 border-bottom border-top clearfix", {muted: isComplete})}
              onClick={() => this.props.buyResearch(property.id, name)}>

              <div className="col col-9">
                {property.researchDescription(name)}
              </div>

              <div className="col col-3">
                {!isComplete &&
                  <span className='right red'>
                    {property.researchCost(name)} {property.researchName}
                  </span>
                }
              </div>

            </div>
          )
        })}
      </div>
    )
  }
})
