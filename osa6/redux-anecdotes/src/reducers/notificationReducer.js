const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'REMOVE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setNotification = (notification, seconds) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    setTimeout(() => {
      dispatch(removeNotification())
    }, seconds * 1000)
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export default reducer
