import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
// import { SET_AUTHED_USER } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {
  state = {
    displayAnsweredQuestions: false
  }
  render() {
    console.log("props: ", this.props)
    console.log('question ids: ', this.props.questionIds)
    const { displayAnsweredQuestions } = this.state
    const { unansweredQuestionIds, answeredQuestionIds, authedUser } = this.props

    if (authedUser === null) {
      return <Redirect to='/login' />
    }

    return (
      <div>
        {/* <h3 className='center'>WOULD YOU RATHER: THE GAME!</h3> */}
        <ul className='dashboard-list'>
          {/* <h1>Logged in User: {authedUser}</h1> */}
          <button onClick={(e) => this.setState((prevState) => ({ displayAnsweredQuestions: !prevState.displayAnsweredQuestions }))}>{displayAnsweredQuestions === true ? 'Answered Questions' : 'Unanswered Questions'}</button><br/>

          {displayAnsweredQuestions ? answeredQuestionIds.map((id) => (
              <li key={id}>
                <Question id={id} />
              </li>
            ))
            // <h1>UNANSWERED QUESTIONS</h1>
            : unansweredQuestionIds.map((id) => (
              <li key={id}>
                <Question id={id} />
              </li>
            ))}

        </ul>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions }) {
  console.log("questions here: ", questions)
  return {
    authedUser: authedUser,
    unansweredQuestionIds: Object.keys(questions).filter((id) => (!questions[id].optionOne.votes.includes(authedUser) && !questions[id].optionTwo.votes.includes(authedUser))).sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    answeredQuestionIds: Object.keys(questions).filter((id) => (questions[id].optionOne.votes.includes(authedUser) || questions[id].optionTwo.votes.includes(authedUser))).sort((a, b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(Dashboard)


// what data does this dashboard component need from the state of our redux store
