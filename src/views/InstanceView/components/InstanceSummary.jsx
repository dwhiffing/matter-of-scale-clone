import React from 'react'
import { format as f, titleify, Color } from 'utils/helpers'
import InstanceProgressBar from './InstanceProgressBar'

export default function InstanceSummary({ instance, tryCompleteInstance }) {
  const currencyDiv = <Color>{titleify(instance.currencyName)}</Color>

  return (
    <div>
      <div className="text-center">
        <h2>{instance.property().name}</h2>

        <InstanceProgressBar
          instance={instance}
          onClick={() => tryCompleteInstance(instance.id)}
        />

        <h5>Goal: {instance.description}</h5>
      </div>

      <p>
        Contains {f(instance.money, '0,0')} {currencyDiv} producing{' '}
        {instance.income()} {currencyDiv} / sec
      </p>
    </div>
  )
}
