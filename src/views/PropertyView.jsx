import React from "react"
import InstanceLineItem from 'views/components/InstanceLineItem'
import { format as f, titleify } from "utils/helpers"

export default ({ properties, history, markInstanceComplete }) => {
  return (
    <div>
    {Object.values(properties).map((property, i) => {
      if (!property.unlocked) return false

      const instances = property.getInstances()

      const name = titleify(property.name)
      const currencyName = titleify(property.currencyName)
      const researchName = titleify(property.researchName)

      const money = f(property.money(), "0,0")
      const research = f(property.researchMoney, "0")
      const income = f(property.income(), "0,0")

      const researchLink = (
        <a href={`#/research/${property.id}`}>{name} Improvements</a>
      )

      if (i > 0) {
        var last = properties[i - 1]
        var lastName = titleify(last.name)
        var next = last.toCompleteUntilNextInstance
      }

      return (
        <div key={i}>

          <h3>{name}s</h3>

          {i > 0 && next > 0 &&
            <p>
              {lastName}s til next {property.name}: {next}
            </p>
          }

          {instances.length > 0 &&
            <div>
              <p>
                {money} {currencyName} stored and producing {income} per tick
              </p>

              <p>
                {research} {researchName} is available for use on {researchLink}.
              </p>

              <p>
                {property.completed} {name}s have been completed total.
              </p>

              <h4>
                Active {name}s <span className="badge">{instances.length}</span>
              </h4>

              <ul className="list-group">
                {instances.map((instance, i) => {
                  return (
                    <InstanceLineItem
                      key={i}
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
