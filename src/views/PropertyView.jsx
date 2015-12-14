import React from "react"
import InstanceLineItem from 'views/components/InstanceLineItem'
import { format as f, titleify } from "utils/helpers"


export default ({ properties, history, markInstanceComplete }) => {
  let last
  return (
    <div>
      {Object.values(properties).map((property, i) => {

        // TODO: this is clumsy, clean it up!
        const lastClone = Object.assign({}, last)
        const lastName = titleify(lastClone.name)
        if (!lastClone || !property.unlocked) return false
        last = property
        // end cleanup

        const instances = property.getInstances()
        const next = lastClone.toCompleteUntilNextInstance
        const cur = titleify(property.currencyName)
        const name = titleify(property.name)
        const money = f(property.money(), "0,0")
        const research = f(property.researchMoney, "0")
        const researchName = titleify(property.researchName)
        const income = f(property.income(), "0,0")
        const id = property.id

        const researchLink = (
          <a href={`#/research/${id}`}>{name} Improvements</a>
        )

        return (
          <div key={i}>

            <h3>{name}s</h3>

            {next > 0 &&
              <p>
                {lastName}s til next {property.name}: {next}
              </p>
            }

            {instances.length > 0 &&
              <div>
                <p>
                  {money} {cur} stored and producing {income} per tick
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
