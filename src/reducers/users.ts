import { User } from '@sensenet/default-content-types';
import { IODataParams, Repository } from '@sensenet/client-core';

export interface ChangePasswordBody {
    UserPsw: string;
    OldPsw: string;
}

export interface ChangePasswordReturns {
    value: string;
}

export const updatePass = (path: string, options: IODataParams<User> = {}, body: ChangePasswordBody) => ({
    type: 'UPDATE_PASSWORD',
    // tslint:disable:completed-docs
    async payload(repository: Repository) {
        const actionResult =  await repository.executeAction<ChangePasswordBody, ChangePasswordReturns>({
            name: 'BisonProfileSetUserPassword',
            idOrPath: path,
            method: 'POST',
            body: {
                UserPsw: body.UserPsw,
                OldPsw: body.OldPsw,
            }
        });
        return actionResult;
    },
});

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

export const search = (path: string, options: IODataParams<User> = {}) => ({
    type: 'SEARCH',
    // tslint:disable:completed-docs
    async payload(repository: Repository) {
        const data = await repository.loadCollection({
            path,
            oDataOptions: options,
        });
        return data.d.results;
    },
});

export default function updateInfo(
    state: {
        isLoading: boolean, 
        isPassUpdated: boolean,
        user: User, 
        loadedUsers: User[],
        updatePass: User[]
    } = {
        isLoading: true, 
        isPassUpdated: false,
        user: {} as any, 
        loadedUsers: [],
        updatePass: []
    }, action: any) {
        
    // save logined user info
    if (action.type === 'UPDATE_LOGINED_USER') {
        return {
            ...state,
            user: action.payload
        };
    }

    // load other users info 
    if (action.type === 'LOAD_USERS') {
        return {
            ...state,
            isLoading: true,
        };
    }

    if (action.type === 'LOAD_USERS_SUCCESS') {
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

    // password update
    if (action.type === 'UPDATE_PASSWORD') {
        return {
            ...state,
            isPassUpdated: false,
        };
    }   

    if (action.type === 'UPDATE_PASSWORD_SUCCESS') {
        return {
            ...state,
            isPassUpdated: true,
            updatePass: action.payload.updatePass
        };
    }   

    if (action.type === 'UPDATE_PASSWORD_FAIL') {
        return {
            ...state,
            isPassUpdated: false,
        };
    }   

    // search action
    if (action.type === 'SEARCH') {
        return {
            ...state,
            isPassUpdated: false,
        };
    }   

    if (action.type === 'SEARCH_SUCCESS') {
        return {
            ...state,
            isPassUpdated: true,
            updatePass: action.payload.search
        };
    }   

    if (action.type === 'SEARCH_FAIL') {
        return {
            ...state,
            isPassUpdated: false,
        };
    }   
    
    // update current user info
    if (action.type === 'SET_USER_INFO') {
        return  {
            ...state,
            user: {
                ...state.user,
                FullName :          action.payload.FullName,
                JobTitle: 		    action.payload.JobTitle,
				Email: 			    action.payload.Email,
				Languages: 		    action.payload.Languages,
				Phone: 			    action.payload.Phone,
				BirthDate: 		    action.payload.BirthDate,
				Education: 		    action.payload.Education,
                Description: 	    action.payload.Description,
                AvatarImageRef: 	{
                    Path: action.payload.AvatarImageRef,
                }
            }
        };
    }
    return state;
}
