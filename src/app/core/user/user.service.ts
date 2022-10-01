import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class UserService {
    private readonly API_URL = 'https://k9i9drz6.directus.app/users/me';

    constructor(private readonly http: HttpClient) {}

    getCurrentUser(): Observable<any> {
        return this.http.get(this.API_URL);
    }
}