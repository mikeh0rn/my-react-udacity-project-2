import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { questionsAsked, questionsAnswered } from '../utils/helpers'


class Leaderboard extends Component {


  render() {
    const { users, userIds, authedUser, questions, location } = this.props

    if (authedUser === null) {
      // return <Redirect to='/login' />
      return <Redirect to={{
        pathname: "/login",
        state: { from: location.pathname }
      }} />
    }


    return (
      <div>
        <h3>Leaderboard</h3>
        <ul>
          {userIds.map((id) => (
            <li key={id}>
              <div>
                <img src={users[id].avatarURL} className='avatar' />
                <p>Username: {users[id].name}</p>
                <p>Number of Questions Asked: {users[id].questions.length}</p>
                <p>Number of Questions Answered: {questionsAnswered(questions, id)}</p>
              </div>
            </li> ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ users, userIds, authedUser, questions }) {
  const usersIDs = Object.keys(users).sort((a,b) => (questionsAsked(questions, b) + questionsAnswered(questions, b)) - (questionsAsked(questions, a) + questionsAnswered(questions, a)) );

  return {
    users,
    userIds: usersIDs,
    authedUser,
    questions
  }
}

export default connect(mapStateToProps)(Leaderboard)
