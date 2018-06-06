import { User } from '@sensenet/default-content-types';
import { IODataParams, Repository } from '@sensenet/client-core';

export const loadUsers = (path: string, options: IODataParams<User> = {}) => ({
    type: 'LOAD_USERS',
    // tslint:disable:completed-docs
    async payload(repository: Repository) {
        const data = await repository.loadCollection({
            path,
            oDataOptions: options,
        });
        return data.d.results;
    },
});

export default function updateInfo(state: {isLoading: boolean, user: User, loadedUsers: User[]} = {isLoading: true, user: {} as any, loadedUsers: []}, action: any) {
    if (action.type === 'UPDATE_LOGINED_USER') {

        return {
            state,
            user: action.payload
        };
    }

    if (action.type === 'LOAD_USERS') {
        return {
            ...state,
            isLoading: true,
        };
    }

    if (action.type === 'LOAD_USERS_SUCCESS') {
        /** */
        return {
            ...state,
            isLoading: false,
            loadedUsers: action.payload.users
        };
    }   

    if (action.type === 'LOAD_USERS_FAILURE') {
        return {
            ...state,
            isLoading: false,
        };
    }   
    
    if (action.type === 'SET_USER_INFO') {
        return  {
            state,
            user: {

                FullName :      action.payload.FullName,
                JobTitle: 		action.payload.JobTitle,
				Email: 			action.payload.Email,
				Languages: 		action.payload.Languages,
				Phone: 			action.payload.Phone,
				BirthDate: 		action.payload.BirthDate,
				Education: 		action.payload.Education,
				Description: 	action.payload.Description,
            }
        };
    }
    return state;
}
