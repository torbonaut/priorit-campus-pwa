import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PictureTip, PictureTipApiResponse } from "./picture-tip.model";

@Injectable()
export class PictureTipService {
    private readonly API_BASE_URL = environment.apiBaseUrl;
    private readonly API_URL = this.API_BASE_URL + '/items/picture_tip';

    constructor(private readonly http: HttpClient) {}

    loadPictureTips(): Observable<PictureTipApiResponse> {
        return this.http.get<PictureTipApiResponse>(this.API_URL);
    }

    addPictureTips(
        item: Omit<PictureTip, 'id' | 'user_created' | 'date_created'>
    ): Observable<{ data: PictureTip }> {
        return this.http.post<{ data: PictureTip }>(this.API_URL, { ...item });
    }

    updatePictureTips(id: number, is_correct: boolean) {
        return this.http.patch(this.API_URL + '/' + id, {
            is_correct,
        });
    }
}
