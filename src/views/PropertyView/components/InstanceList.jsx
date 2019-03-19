import React from 'react'
import { format as f, titleify, Color } from 'utils/helpers'
import InstanceLineItem from '../../InstanceView/components/InstanceLineItem'

export default function InstanceList({
  property,
  instances,
  tryCompleteInstance,
  clickInstance,
}) {
  const income = f(property.income(), '0,0')
  const money = f(property.money(), '0,0')
  const research = f(property.researchMoney, '0')

  const currencyName = <Color>{titleify(property.currencyName)}</Color>
  const researchName = <Color>{titleify(property.researchName)}</Color>
  return (
    <div>
      <p>
        {money} {currencyName} stored and producing {income} per tick
      </p>

      <p>
        {research} {researchName} is available for use on{' '}
        <a href={`#/research/${property.id}`}>{name} Improvements</a>.
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
              clickInstance={clickInstance}
              clickComplete={id => tryCompleteInstance(id)}
            />
          )
        })}
      </ul>
    </div>
  )
}
