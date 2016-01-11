import TestUtils from 'react-addons-test-utils'
import React from 'react'

const createFind = (typeFunc, classFunc, tagFunc) => {
  return function(selector) {
    let elements, name
    if (!(typeof selector === "string")) {
      name = selector.name.toLowerCase()
      elements = typeFunc(this.instance, selector)
    } else if (selector.match(/\./)) {
      selector = selector.replace(/\./, '')
      elements = classFunc(this.instance, selector)
    } else {
      elements = tagFunc(this.instance, selector)
    }

    if (Array.isArray(elements) && elements.length === 1) {
      this.elements[name || selector] = elements[0]
    } else {
      this.elements[name || selector] = elements
    }
  }
}

export default {
  findMany: createFind(
    TestUtils.scryRenderedComponentsWithType,
    TestUtils.scryRenderedDOMComponentsWithClass,
    TestUtils.scryRenderedDOMComponentsWithTag,
  ),
  findOne: createFind(
    TestUtils.findRenderedComponentWithType,
    TestUtils.findRenderedDOMComponentWithClass,
    TestUtils.findRenderedDOMComponentWithTag,
  )
}
