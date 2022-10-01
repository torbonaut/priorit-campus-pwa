export interface AuthResponse {
    data: AuthData;
}

export interface AuthData {
    access_token: string;
    expires: number;
    refresh_token: string;
}

export interface AuthStateModel {
    accessToken: string;
    refreshToken: string;
}

export interface AuthCredentials {
    email: string;
    password: string;
}

export const EmptyAuthState: AuthStateModel = {
    accessToken: '',
    refreshToken: ''
}