import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class DummyService {
    private readonly API_URL = 'https://k9i9drz6.directus.app/items/dummy';
    constructor(private readonly http: HttpClient) {}

    list(): Observable<any> {
        return this.http.get(this.API_URL);
    }
}