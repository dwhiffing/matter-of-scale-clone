import React from 'react'
import InstanceList from './components/InstanceList'
import { titleify } from 'utils/helpers'

export default class PropertyView extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  render() {
    const { properties, tryCompleteInstance } = this.props
    return (
      <div>
        {Object.values(properties).map((property, i) => {
          if (!property.unlocked) return false

          const instances = property.getInstances()
          const last = properties[i - 1]

          return (
            <div className={property.name} key={i}>
              <h3>{titleify(property.name)}s</h3>

              {last && (
                <p>
                  {titleify(last.name)}s til next {property.name}:{' '}
                  {last.toCompleteUntilNextInstance}
                </p>
              )}

              {instances && (
                <InstanceList
                  property={property}
                  instances={instances}
                  tryCompleteInstance={tryCompleteInstance}
                  clickInstance={id =>
                    this.context.router.push(`/instance/${id}`)
                  }
                />
              )}
            </div>
          )
        })}
      </div>
    )
  }
}
