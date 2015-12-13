import React from "react"
import { format } from "utils/helpers"

export default ({instance, clickInstance, clickComplete}) => {

  return (
    <li className="bar-wrap col col-12 left-align">

      <a onClick={() => clickInstance(instance.id)}>
        {format(instance.money, "0,0")} => {instance.income()}/s
      </a>

      {instance.progress >= 100 &&
        <span className="px1">
          <span className="h5 px1">
            {instance.autoComplete}/{instance.autoCompleteDuration()}
          </span>
          <button onClick={() => clickComplete(instance.id)}>
            Complete Level
          </button>
        </span>
      }

    </li>
  )
}
