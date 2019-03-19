import React from 'react'
import ResearchButton from './components/ResearchButton'
import { titleify, Color } from 'utils/helpers'
import ResearchList from './components/ResearchList'

export default class ResearchView extends React.Component {
  render() {
    const { params, properties, tryBuyResearch } = this.props
    const property = properties[params.property]
    const { researchMoney, researchName } = property

    return (
      <div className={property.name}>
        <div className="text-center">
          <h3>{titleify(property.name)} Improvements</h3>

          <h5>
            {researchMoney} <Color>{titleify(researchName)}</Color>
          </h5>
        </div>

        <ResearchList
          property={property}
          nextProperty={properties[+params.property + 1]}
          tryBuyResearch={tryBuyResearch}
        />
      </div>
    )
  }
}
