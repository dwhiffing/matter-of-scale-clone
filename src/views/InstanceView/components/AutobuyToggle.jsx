import React from 'react'

export default function AutobuyToggle({ instance, toggleAutoBuy }) {
  return (
    <a onClick={() => toggleAutoBuy(instance.id)}>
      Toggle Autobuy: {instance.disableAutoBuy ? 'off' : 'on'}
    </a>
  )
}
