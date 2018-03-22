const initialState = {};


export default function userImage(state = initialState, action ) {
    if (action.type === 'GET_USER_IMAGE') {
        return Object.assign({}, state, {
            userImageSRC: action.payload._deferred
      })
    }
    return state;
}
