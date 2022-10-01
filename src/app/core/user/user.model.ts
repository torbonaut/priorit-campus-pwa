export interface UserStateModel {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    title: string;
    description: string;
    status: UserStatus | string;
    avatar: string;
}

export const EmptyUserState: UserStateModel = {
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    title: '',
    description: '',
    status: '',
    avatar: ''
}

export enum UserStatus {
    draft = 'draft',
    invited = 'invited',
    active = 'active',
    suspended = 'suspended',
    archived = 'archived'
}

export interface UserApiResponse {
    data: {
        id: string;
        first_name: string;
        last_name: string;
        email: string;
        password: string;
        location: string;
        title: string;
        description: string;
        tags: any;
        avatar: any;
        language: string;
        theme: string;
        tfa_secret: string;
        status: UserStatus;
        role: string;
        token: string;
        last_access: string;
        last_page: string;
    }
}    
