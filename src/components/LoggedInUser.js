import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser';

class LoggedInUser extends Component {

  logout = (e) => {
    e.preventDefault()
    this.props.dispatch(setAuthedUser(null))
    this.props.history.push('/login')
  }

  render() {
    const { users, authedUser } = this.props

    return (
      <Fragment>
        <div>
          {authedUser !== null
            ? <div className='loggedInBox'>
                  <button onClick={(e) => this.logout(e)}><img src={users[authedUser].avatarURL} className='avatar' />
                <div>
                  {users[authedUser].name}<br />
                  *SELECT TO LOGOUT*
                </div>
                 </button>
              </div>
            : <div />}
        </div>
    </Fragment>
    )
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    users,
    authedUser
  }
}

export default withRouter(connect(mapStateToProps)(LoggedInUser))
