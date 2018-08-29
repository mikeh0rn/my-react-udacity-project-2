import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { formatQuestion } from '../utils/helpers'
import { Link } from 'react-router-dom'
// import TiArrowBackOutline from 'react-icons/lib/ti/arrow-back-outline'
// import TiHeartOutline from 'react-icons/lib/ti/heart-outline'
// import TiHeartFullOutline from 'react-icons/lib/ti/heart-full-outline'


class Question extends Component {
  render() {
    const { question } = this.props

    if (question === null) {
      return <p>This question doesn't exist</p>
    }

    const {
      id, optionOne, optionTwo
    } = question

    console.log("props here: ", this.props)
    console.log('question: ', question)

    return (
      <div className='question'>
        {/* <div>{id}</div>
        <div>{optionOne.text}</div>
        <div>{optionTwo.text}</div>
        <div>{name}</div> */}
        <Link to={`/questions/${id}`} className='question'>
        <div> Would you rather? </div>
         <h2>{optionOne.text} </h2>
         <h2>{optionTwo.text} </h2>
         </Link>
      </div>
    )
  }
}

// The important thing to notice here is that mapStateToProps accepts two arguments:
// the state of the store
// the props passed to the Question component
//what info do we want to pass from the state of our redux store to our Question component:
//
function mapStateToProps ({authedUser, users, questions}, { id }) {
  const question = questions[id]

  // const author = question ? users[question.author] : null

  return {
    id,
    question
  }
}

export default connect(mapStateToProps)(Question)
