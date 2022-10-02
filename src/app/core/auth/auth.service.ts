import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthCredentials, AuthResponse } from "./auth.model";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly API_BASE_URL = environment.apiBaseUrl;
    private readonly API_URL = this.API_BASE_URL + '/auth';

    constructor(private readonly http: HttpClient) {}

    authenticate(credentials: AuthCredentials): Observable<any> {
        return this.http.post<AuthResponse>(
            this.API_URL + '/login',
            credentials
        );
    }

    refresh(refreshToken: string): Observable<any> {
        return this.http.post<AuthResponse>(this.API_URL + '/refresh', {
            refresh_token: refreshToken,
            mode: 'json',
        });
    }

    logout(refreshToken: string) {
        return this.http.post<void>(this.API_URL + '/logout', {
            refresh_token: refreshToken,
        });
    }
}