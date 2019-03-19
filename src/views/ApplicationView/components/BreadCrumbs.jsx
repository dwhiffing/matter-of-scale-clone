import React from 'react'
import { titleify } from 'utils/helpers'

export default function BreadCrumbs({ instance, property }) {
  return (
    <ol className="breadcrumb">
      <li>
        <strong>Idle Game</strong>
      </li>

      <li>
        <a href="#/property">Properties</a>
      </li>

      {instance && (
        <li className="active">
          <a href={`#/instance/${instance}`}>
            {titleify(property.name)} {instance}
          </a>
        </li>
      )}

      {property && (
        <li className="active">
          <a href={`#/research/${property}`}>
            {titleify(property.name)} Improvements
          </a>
        </li>
      )}
    </ol>
  )
}
