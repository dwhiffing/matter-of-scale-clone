import React from 'react'
import Icon from 'shared/views/interface/Icon'
import { changeRoute } from 'shared/utils/History'

const PriorityAdvert = React.createClass({

  render() {
    return (
      <div className="advert-info card col-6 row center stretch" onClick={() => changeRoute(`priority_listings/new`)}>
        <div className="footer row center stretch color-white bg-secondary">

          <Icon className="block" name="cl-logo"/>

          <h1 className="bold sm-h2 no-wrap">
            Get Noticed!
          </h1>

          <h3 className="bold sm-h3 no-wrap">
            Appear in the top 5 <br/> search results!
          </h3>

          <h3 className="sm-h3 no-wrap">
            Only 99 cents a day <br/> (for 30 days) +tax*
          </h3>

          <h5 className="underline">
            Learn More
          </h5>

        </div>
      </div>
    )
  }
})

export default PriorityAdvert
