import React from 'react'
import cx from 'classnames'

export default function ResearchButton({
  onClick,
  cost,
  disabled,
  canAfford,
  children,
}) {
  return (
    <button
      onClick={onClick}
      className={cx('list-group-item', { disabled: disabled })}>
      {children}

      {!disabled && (
        <span className={cx('badge', { danger: !canAfford })}>{cost}</span>
      )}
    </button>
  )
}
