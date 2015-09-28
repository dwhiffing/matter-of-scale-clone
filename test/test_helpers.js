// require('react/lib/ExecutionEnvironment').canUseDOM = true

function Find(selector) {
  let elements, name
  if (typeof selector !== "string") {
    name = selector.name.toLowerCase()
    elements = TestUtils.scryRenderedComponentsWithType(this.instance, selector)
  } else if (selector.match(/\./)) {
    selector = selector.replace(/\./, '')
    elements = TestUtils.scryRenderedDOMComponentsWithClass(this.instance, selector)
  }
  else elements = TestUtils.scryRenderedDOMComponentsWithTag(this.instance, selector)

  if (elements.length === 1) elements = elements[0]
  if (!this.helpers.elements) this.helpers.elements = []
  this.helpers.elements[name || selector] = elements
}

class Test {
  constructor(component, config) {
    this.component = component

    if (config && config.shallow === true) {
      let shallowRenderer = TestUtils.createRenderer();
      shallowRenderer.render(component);
      this.instance = shallowRenderer.getRenderOutput();
    }
    else {
      this.instance = TestUtils.renderIntoDocument(component)
    }

    this.helpers = {}
    return this
  }

  use(callback, data) {
    callback.call(this, data)
    return this
  }

  test(callback) {
    var params = this.params()
    callback.call(params, params)
    return this
  }

  params() {
    var length = Object.keys(this.helpers).length
    if (this.helpers.elements && length === 1) {
      return Object.assign({}, this, this.helpers.elements)
    }
    return this
  }

  // Built in middleware

  find(data) {
    Find.call(this, data)
    return this
  }

  renderToString(callback) {
    var component = React.renderToStaticMarkup(this.component)
    callback.call(null, component)
    return this
  }
}

export default function TestWrapper(component, config) {
  return new Test(component, config)
}
