import React from "react"
import { buyResearch } from "actions/PropertyActions"
import cx from "classnames"
import { format as f, titleify } from "utils/helpers"

export default React.createClass({
  render() {
    const {params,properties} = this.props
    const property = properties[params.property]
    const name = titleify(property.name)

    return (
      <div>

        <h3 style={{textAlign:'center'}}>
          {name} Improvements
        </h3>

        <h5 style={{textAlign:'center'}}>
          {property.researchMoney} {property.researchName}
        </h5>

        <div className="list-group">
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

            const style = canAfford ? {} : {backgroundColor: ''}

            return (
              <button type="button" key={i} className={cx("list-group-item", {
                  disabled: isComplete
                })}
                onClick={() => this.props.buyResearch(property.id, name, cost)}>

                {property.researchDescription(name)}

                {!isComplete &&
                  <span className={cx("badge", {
                    danger: !canAfford
                  })}>
                    {cost}
                  </span>
                }

              </button>
            )
          })}
        </div>
      </div>
    )
  }
})
