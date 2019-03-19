import React from 'react'
import InstanceSummary from './components/InstanceSummary'
import ResearchMenu from './components/ResearchMenu'
import AutobuyToggle from './components/AutobuyToggle'
import BuildingList from './components/BuildingList'

export default class InstanceView extends React.Component {
  render() {
    const instance = this.props.instances[this.props.params.instance]

    if (!instance) return false

    return (
      <div className={instance.property().name}>
        <InstanceSummary
          instance={instance}
          tryCompleteInstance={this.props.tryCompleteInstance}
        />

        <ResearchMenu instance={instance} />

        <AutobuyToggle
          instance={instance}
          toggleAutoBuy={this.props.toggleAutoBuy}
        />

        <BuildingList
          ui={this.props.ui}
          instance={instance}
          tryUpgradePurchase={this.props.tryUpgradePurchase}
          tryBuildingPurchase={this.props.tryBuildingPurchase}
          _unlockBuilding={this.props._unlockBuilding}
        />
      </div>
    )
  }
}
