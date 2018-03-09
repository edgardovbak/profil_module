const initialState = {};


export default function updateInfo(state = initialState, action ) {
    if (action.type === 'UPDATE_LOGINED_USER') {
        return Object.assign({}, state, {
            user: action.payload
      })
    }
    return state;
}
