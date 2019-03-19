import React from 'react'
import { format as f } from 'utils/helpers'

export default function InstanceSummary({ instance, tryCompleteInstance }) {
  const currencyDiv = <Color>{titleify(instance.currencyName)}</Color>

  return (
    <>
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
    </>
  )
}
