import React from "react"

export default ({title, children, color}) => {
  return (
    <div className="px1 h5 col col-6">
      <span className={`${color} caps`}>
        {title}
      </span>
      {children}
    </div>
  )
}
