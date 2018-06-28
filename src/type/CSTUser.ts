import { 
    User,
    GenericContent
} 							from '@sensenet/default-content-types';

export class DeferredUriObject {
    uri: string;
}
export class DeferredObject extends Object {
    // tslint:disable-next-line:variable-name
    __deferred: DeferredUriObject;
}

export type ContentReferenceField<T> = DeferredObject | T | number;

export class CSTUser extends User {
     LoginName?: string;
     JobTitle?: string;
     Enabled?: boolean;
     Domain?: string;
     Email?: string;
     FullName?: string;
     AvatarImageRef?: ContentReferenceField<GenericContent>;
     WorkPhone?: number;
     GitHub?: string;
     Linkedin?: string;
     Skype?: string;
     Skills?: string;
     Achievement?: [Achievement];
 }
 
 interface ImageRef {
    Path: string;
}

interface Achievement {
    Name: string;
    Description:  string;
    BackgroundcolorColor: string;
    BorderColorIcon:  string;
    BorderColorAchievement:  string;
    AchievementImageRef: ImageRef;
}
