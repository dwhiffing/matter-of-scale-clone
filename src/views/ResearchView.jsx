import React from 'react'
import cx from 'classnames'
import { titleify, Color } from 'utils/helpers'

export default class ResearchView extends React.Component {
  render() {
    const { params, properties, tryBuyResearch } = this.props
    const property = properties[params.property]
    const name = titleify(property.name)
    const { researchMoney, researchName } = property

    return (
      <div className={property.name}>
        <div className="text-center">
          <h3>{name} Improvements</h3>

          <h5>
            {researchMoney} <Color>{titleify(researchName)}</Color>
          </h5>
        </div>

        <div className="list-group">
          {Object.keys(property.researchTypes).map((name, i) => {
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
              const nextProperty = properties[+params.property + 1]
              if (!nextProperty.unlocked) {
                return false
              }
            }

            return (
              <button
                key={i}
                onClick={() => tryBuyResearch(property.id, name, cost)}
                className={cx('list-group-item', {
                  disabled: isComplete,
                })}>
                {property.researchDescription(name)}

                {!isComplete && (
                  <span
                    className={cx('badge', {
                      danger: !canAfford,
                    })}>
                    {cost}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    )
  }
}
