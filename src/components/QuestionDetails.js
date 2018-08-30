import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAnswerQuestion } from '../actions/questions';
import { getAvatar, answeredByAuthedUser, selectedByAuthedUser, calcPercentage } from '../utils/helpers'

class QuestionDetails extends Component {
  handleVote = (e, option) => {
    e.preventDefault()

    const { dispatch, authedUser, id } = this.props

    dispatch(handleAnswerQuestion({
      authedUser,
      qid: id,
      answer: option
    }))
  }

  render() {
    const { authedUser, question, users } = this.props
    if (question === null) {
      return <p>404 error!!</p>
    }

    if (authedUser === null) {
      return <Redirect to='/login' />
    }
    const avatar = getAvatar(question, users)

    return (
      <div>
        {answeredByAuthedUser(authedUser, question)
          ? (<div className='questionDetails'>
            <p>Option A: {question.optionOne.text}</p>
            <p>Total Votes: {question.optionOne.votes.length} people voted for this option.
             Pecentage: {calcPercentage(question, question.optionOne)}
             {selectedByAuthedUser(authedUser, question.optionOne) && 'This is your selection!'}</p>
            <p>Option B: {question.optionTwo.text}</p>
            <p>{question.optionTwo.votes.length} people voted for this question,
             That are {calcPercentage(question, question.optionTwo)} Percent!
             {selectedByAuthedUser(authedUser, question.optionTwo) && 'This is your selection!'}</p>
          </div>)
          : (<div>
            <img src={avatar} className='avatar' />
            <p><em>Would You Rather (select one):</em></p>
            <button onClick={(e) => this.handleVote(e, 'optionOne')}>
              {question.optionOne.text}
            </button>
            <button onClick={(e) => this.handleVote(e, 'optionTwo')}>
              {question.optionTwo.text}
            </button>
          </div>)
        }
      </div>
    )
  }
}


function mapStateToProps({ questions, users, authedUser }, props) {
  const { id } = props.match.params
  return {
    question: questions[id]
      ? questions[id]
      : null,
    users,
    authedUser,
    id
  }
}

export default connect(mapStateToProps)(QuestionDetails)
