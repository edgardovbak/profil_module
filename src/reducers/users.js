
export default function updateInfo(state = {}, action) {
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
                FullName :      action.payload.FullName,
                JobTitle: 		action.payload.JobTitle,
				Email: 			action.payload.Email,
				Languages: 		action.payload.Languages,
				Phone: 			action.payload.Phone,
				BirthDate: 		action.payload.BirthDate,
				Education: 		action.payload.Education,
				Description: 	action.payload.Description,
            }
        }
    }
    return state;
}
