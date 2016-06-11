import React from 'react'
import { format, titleify } from 'utils/helpers'

export default ({ instance, clickInstance, clickComplete }) => {

  const name = titleify(instance.name)
  const money = format(instance.money, '0,0')
  const cur = titleify(instance.currencyName)
  const income = format(instance.income(), '0,0')
  const percent = format(instance.progress, '0')

  const isComplete = percent >= 100
  const autoComplete = isComplete ? 100-instance.autoCompleteProgress() : percent
  const onClick = isComplete ?  () => clickComplete(instance.id) : () => clickInstance(instance.id)

  const goalPercent = Math.floor(Math.min(100, instance.progress))
  const goalDescription = `${instance.goal.description} (${goalPercent}%)`

  return (
    <li className="h5 row list-group-item relative m0">

      <div className="bg-progress-bar" style={{ right: `${100-autoComplete}%` }} />

      <div className="row relative" style={{ zIndex: 1 }}>

        <div className="col-xs-3" onClick={() => clickInstance(instance.id)}>
          <a>{name} {instance.id}</a>
        </div>

        <div className="text-center col-xs-6" onClick={onClick}>
          <a>{isComplete ? 'Click to complete' : goalDescription}</a>
        </div>

        <div className="text-right col-xs-3">
          {money} {cur} <small>{income} / s</small>
        </div>

      </div>
    </li>
  )
}
