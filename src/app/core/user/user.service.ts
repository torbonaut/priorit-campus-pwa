import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class UserService {
    private readonly API_BASE_URL = environment.apiBaseUrl;
    private readonly API_URL = this.API_BASE_URL + '/users/me';

    constructor(private readonly http: HttpClient) {}

    getCurrentUser(): Observable<any> {
        return this.http.get(this.API_URL);
    }
}