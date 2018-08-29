import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class Nav extends Component {
  render() {
    const { authedUser } = this.props
    return (
      <div>
        {authedUser !== null
          ? <nav className='nav'>
            <ul>

              <li><NavLink to='/'>HOME</NavLink></li>
              <li><NavLink to='/add'>NEW QUESTION</NavLink></li>
              <li><NavLink to='/leaderboard'>LEADERBOARD</NavLink></li>
            </ul>
          </nav>
          : null}
      </div>

    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(Nav)
