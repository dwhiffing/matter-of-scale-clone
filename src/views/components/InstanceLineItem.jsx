import React from "react"
import { ProgressBar } from 'react-bootstrap'
import { format, titleify } from "utils/helpers"

export default ({instance, clickInstance, clickComplete}) => {

  const name = titleify(instance.name)
  const money = format(instance.money, "0,0")
  const cur = titleify(instance.currencyName)
  const income = format(instance.income(), "0,0")
  const percent = format(instance.progress, "0")

  const isComplete = percent >= 100
  const autoComplete = isComplete ? 100-instance.autoCompleteProgress() : percent
  const onClick = isComplete ?  () => clickComplete(instance.id) : () => {}

  return (
    <li className="h5 row list-group-item relative m0">

      <div className="bg-progress-bar" style={{right: `${100-autoComplete}%`}} />

      <div className="row relative" style={{zIndex: 1}}>

        <div className="col-xs-4" onClick={() => clickInstance(instance.id)}>
          <a>{name} {instance.id}</a>
        </div>

        <div className="text-center col-xs-4" onClick={onClick}>
          {isComplete && <a>Click to complete</a>}
        </div>

        <div className="text-right col-xs-4">
          {money} {cur} <small>{income} / s</small>
        </div>

      </div>
    </li>
  )
}
