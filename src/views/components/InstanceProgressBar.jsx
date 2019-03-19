import React from 'react'
import { ProgressBar } from 'react-bootstrap'

export default (instance, onClick) => {
  const progress = Math.floor(Math.min(100, instance.progress))
  if (progress >= 100) {
    return (
      <div onClick={onClick}>
        <ProgressBar
          className="pointer"
          now={100 - instance.autoCompleteProgress()}
          label={`${progress}%`}
        />

        <h6>Click bar to complete level or wait for auto-complete</h6>
      </div>
    )
  } else {
    return <ProgressBar now={progress} label={`${progress}%`} />
  }
}
