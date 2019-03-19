import React from 'react'
import ResearchButton from './ResearchButton'

export default function({ property, nextProperty, tryBuyResearch }) {
  return (
    <div className="list-group">
      {Object.keys(property.researchTypes).map((researchName, i) => {
        if (/autoBuy/.test(researchName)) {
          const building = parseInt(researchName.split('-')[1])
          if (property.unlockedBuildings.indexOf(building) === -1) {
            return false
          }
        } else if (/incrementCost/.test(researchName)) {
          if (!nextProperty.unlocked) {
            return false
          }
        }

        const cost = property.researchCost(researchName)

        return (
          <ResearchButton
            key={i}
            onClick={() => tryBuyResearch(id, researchName, cost)}
            cost={cost}
            disabled={!property.researchComplete(researchName)}
            canAfford={cost <= property.researchMoney}>
            {property.researchDescription(researchName)}
          </ResearchButton>
        )
      })}
    </div>
  )
}
