import React from "react"
import { buyResearch } from "actions/PropertyActions"
import cx from "classnames"
import { format as f } from "utils/helpers"

export default React.createClass({
  render() {
    const {params,properties} = this.props
    const property = properties[params.property]
    return (
      <div>
        <div className="h2 bold center">
          {property.name.toUpperCase()} RESEARCH
        </div>
        <div className="h4 center p1">
          {property.researchMoney} {property.researchName}
        </div>

        {Object.keys(property.researchTypes).map((name, i) => {

          const research = property.researchTypes[name]
          const isComplete = property.researchComplete(name)
          const cost = property.researchCost(name)
          const canAfford = cost <= property.researchMoney

          if (/autoBuy/.test(name)) {
            const building = parseInt(name.split('-')[1])

            if (property.unlockedBuildings.indexOf(building) === -1) {
              return false
            }
          }

          if (/incrementCost/.test(name)) {
            const nextProperty = properties[+(params.property)+1]
            if (!nextProperty.unlocked) {
              return false
            }
          }

          return (
            <div key={i}
              className={cx("p1 border-bottom border-top clearfix", {muted: isComplete})}
              onClick={() => this.props.buyResearch(property.id, name, cost)}>

              <div className="col col-9">
                {property.researchDescription(name)}
              </div>

              <div className="col col-3">
                {!isComplete &&
                  <span className={cx('right',{
                    red: !canAfford,
                    green: canAfford
                  })}>
                    {cost} {property.researchName}
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
