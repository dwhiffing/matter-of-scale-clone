import React from 'react'
import { Link } from 'react-router'
import { format } from 'utils/helpers'

export default function NavBar({
  upgrades,
  multi,
  clearSave,
  changeUpgradePoints,
  toggleMuliplier,
}) {
  return (
    <nav className="navbar navbar-default navbar-fixed-bottom">
      <div className="container">
        <div
          className="row text-center"
          style={{
            margin: '0 -10px',
          }}>
          <a className="col-xs-2" onClick={clearSave}>
            Clear Save
          </a>

          <Link className="col-xs-4" to="#/property">
            View Properties
          </Link>

          <a className="col-xs-4" onClick={() => changeUpgradePoints(0.05)}>
            Get Upgrades ({format(upgrades, '0.00')}U)
          </a>

          <a className="col-xs-2" onClick={toggleMuliplier}>
            x{multi} click
          </a>
        </div>
      </div>
    </nav>
  )
}
