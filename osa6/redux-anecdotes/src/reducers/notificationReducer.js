const reducer = (state = 'notification', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export const newNotification = notification => {
  return {
    type: 'SET_NOTIFIFACTION',
    notification
  }
}

export default reducer
