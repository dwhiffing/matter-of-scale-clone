import React from "react"
import { ProgressBar } from 'react-bootstrap'
import { format, titleify } from "utils/helpers"

export default ({instance, clickInstance, clickComplete}) => {
  const name = titleify(instance.name)
  const money = format(instance.money, "0,0")
  const cur = titleify(instance.currencyName)
  const income = format(instance.income(), "0,0")
  const percent = format(instance.progress, "0")
  const thing = percent >= 100 ? 100 - instance.autoCompleteProgress() : percent
  const progressBarStyle = {
    background: 'rgba(1,1,0,0.1)',
    position: 'absolute',
    top: 0,
    right: `${100-thing}%`,
    transition: "right 100ms",
    bottom: 0,
    left: 0,
    zIndex: 1
  }
  return (
    <li className="h5 row list-group-item" style={{margin: 0, position: 'relative'}}>

      <div style={progressBarStyle} />
      <div style={{zIndex: 1, position: 'relative'}}>

        <span>
          <a onClick={() => clickInstance(instance.id)}>{name} {instance.id}</a>
        </span>

        <span className="pull-right">
          {money} {cur} <small>{income} / s</small>
        </span>

        {instance.progress >= 100 &&
          <span className="px1">
            <button onClick={() => clickComplete(instance.id)}>
              click to complete manually
            </button>
          </span>
        }

      </div>
    </li>
  )
}
