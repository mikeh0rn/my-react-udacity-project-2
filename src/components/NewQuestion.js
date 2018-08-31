import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    submit: false
  }

  handleChange = (e, option) => {
    const text = e.target.value

    this.setState(() => ({
      // console.log("what is the option", option)
      [option]: text
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOneText, optionTwoText } = this.state
    const { dispatch, authedUser } = this.props

    dispatch(handleAddQuestion(optionOneText, optionTwoText, authedUser))

    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      submit: true
    }))

    // this.setState(() => ({
    //   text: ''
    // }))
  }



  render() {

    const { authedUser } = this.props
    if (authedUser === null) {
      return <Redirect to='/login' />
    }

    const { optionOneText, optionTwoText, submit } = this.state
    if (submit) {
      return <Redirect to='/' />
    }
    return (
      <div>
      <h3 className='center'>Add a new question:</h3>
      <form className='new-question' onSubmit={this.handleSubmit}>
        <textarea placeholder="Option One" value={optionOneText} onChange={(e) => this.handleChange(e, 'optionOneText')} className='textarea' />
        <textarea placeholder="Option Two" value={optionTwoText} onChange={(e) => this.handleChange(e, 'optionTwoText')} className='textarea' />
        <button disabled={optionOneText === '' || optionTwoText === ''} type='submit'>Submit</button>
      </form>
      </div>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(NewQuestion)
