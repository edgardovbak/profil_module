const initialState = [];


export default function updateUser(state = initialState, action ) {
    if (action.type === 'UPDATE_LOGINED_USER') {
        return [
            ...state,
             action.payload
        ];
    }
    return state;
}