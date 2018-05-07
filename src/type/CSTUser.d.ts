import { 
    User,
    GenericContent
} 							from '@sensenet/default-content-types';

export declare class DeferredUriObject {
    uri: string;
}
export declare class DeferredObject extends Object {
    __deferred: DeferredUriObject;
}

export declare type ContentReferenceField<T> = DeferredObject | T | number;

export declare class CSTUser extends User {
    //  LoginName?: string;
    //  JobTitle?: string;
    //  Enabled?: boolean;
    //  Domain?: string;
    //  Email?: string;
    //  FullName?: string;
     AvatarImageRef?: ContentReferenceField<GenericContent>;
 }
 