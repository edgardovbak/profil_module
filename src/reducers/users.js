const initialState = {};


export default function updateInfo(state = initialState, action ) {
    if (action.type === 'UPDATE_LOGINED_USER') {
        console.log(action.payload);
        return {
            ...state,
            user: action.payload
        }
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
