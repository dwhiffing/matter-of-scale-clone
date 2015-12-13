import React from "react"
import InstanceLineItem from 'views/components/InstanceLineItem'
import Section from 'views/components/Section'
import { format as f } from "utils/helpers"


export default React.createClass({
  render() {
    const { properties, history, markInstanceComplete } = this.props
    let last

    return (
      <div className="properties-wrap">
        {Object.values(properties).map((property, i) => {

          // TODO: this is clumsy, clean it up!
          const lastClone = Object.assign({}, last)
          if (!lastClone || !property.unlocked) return false
          last = property
          // end cleanup

          const instances = property.getInstances()
          const completed = property.completedInstances()
          const next = lastClone.toCompleteUntilNextInstance

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
                  <Section color={property.color} title={`${property.currencyName}:`}>
                    {f(property.money(), "0,0")} => {property.income()}/s
                  </Section>

                  <Section color={property.color} title="Upgrades:">
                    {f(property.upgrades, "0,0.00")}
                  </Section>

                  <Section color={property.color} title={`${property.researchName}:`}>
                    {property.researchMoney}
                  </Section>

                  <div className="px1 h5 col col-6">
                    <a className="m1 h4 blue"
                      onClick={() => history.push(`/research/${property.id}`)}>
                      research
                    </a>
                  </div>

                  <div className='px2 h3'>
                    Instances: (completed: {completed.length})
                  </div>

                  <ul className="px3 clearfix">
                    {instances.map((instance, i) => {
                      return (
                        <InstanceLineItem key={i}
                          instance={instance}
                          clickInstance={id => history.push(`/instance/${id}`)}
                          clickComplete={id => markInstanceComplete(id)}>
                        </InstanceLineItem>
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
