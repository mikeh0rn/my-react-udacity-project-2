export function formatQuestion (question, author, authedUser) {
  const { id, optionOne, optionTwo } = question
  const { avatarURL, name } = author

  return {
    name,
    id,
    avatar: avatarURL,
    hasAnswered:
      optionOne.votes.includes(authedUser) ||
      optionTwo.votes.includes(authedUser),
    optionOne,
    optionTwo
  }
}

export function questionsAsked(questions, user) {
  let total = 0
  Object.entries(questions).forEach(([key, val]) => {
    if (val.author === user)
    total++
  })
  return total
}

export function questionsAnswered(questions, user) {
  let total = 0
  Object.entries(questions).forEach(([key, val]) => {
    if (val.optionOne.votes.includes(user) || val.optionTwo.votes.includes(user)) {
      total++
    }
  })
  return total
}

export function getAvatar(question, users) {
  let avatar = question && question.author && users[question.author] && users[question.author].avatarURL
    ? users[question.author].avatarURL
    : null
  return avatar
}

export function answeredByAuthedUser(authedUser, question) {
  if (question.optionOne.votes.includes(authedUser) ||
    question.optionTwo.votes.includes(authedUser)) {
    return true
  }
  return false
}

export function calcPercentage(question, option) {
  let total = question.optionOne.votes.length + question.optionTwo.votes.length
  return (option.votes.length / total * 100).toFixed(2)
}

export function selectedByAuthedUser(authedUser, option) {
  if (option.votes.includes(authedUser) ||
    option.votes.includes(authedUser)) {
    return true
  }
  return false
}
