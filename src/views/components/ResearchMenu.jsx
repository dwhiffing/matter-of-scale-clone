import React from 'react'
import { titleify, Color } from 'utils/helpers'

export default function ResearchMenu({ instance }) {
  const currencyAmount = instance.property().researchMoney
  const currencyName = (
    <Color>{titleify(instance.property().researchName)}</Color>
  )
  const researchLink = (
    <a href={`#/research/${instance.type}`}>
      {titleify(instance.name)} Improvements
    </a>
  )
  return (
    <p>
      {currencyAmount} {currencyName} available for {researchLink}.
    </p>
  )
}
