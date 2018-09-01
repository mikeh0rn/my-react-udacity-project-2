import { getInitialData } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { setAuthedUser} from '../actions/authedUser'

//come back to this for the dropdown?
// const AUTHED_ID = 'tylermcginnis'

export function handleInitialData() {
  return (dispatch) => {
    // dispatch(showLoading())
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(setAuthedUser(null))
        // dispatch(hideLoading())
      })
  }
}
