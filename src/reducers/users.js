export default function updateInfo(state = {}, action) {
    console.log(action);
    if (action.type === 'UPDATE_LOGINED_USER') {

        return {
            ...state,
            user: action.payload
        };
    }
    if (action.type === 'SET_USER_INFO') {
        return  {
            ...state,
            user: {
                ...state.user,
                FullName : action.payload
            }
        }
    }
    return state;
}
