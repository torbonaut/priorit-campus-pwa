import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { FileUploadApiResponse, Picture, PictureItApiResponse } from "./picture-it.model";

@Injectable()
export class PictureItService {
    private readonly API_BASE_URL = environment.apiBaseUrl;
    private readonly API_URL = this.API_BASE_URL + '/items/picture_it';
    private readonly FILE_URL = this.API_BASE_URL + '/files';

    constructor(private readonly http: HttpClient) {}

    loadPictures(): Observable<PictureItApiResponse> {
        return this.http.get<PictureItApiResponse>(this.API_URL);
    }

    addPicture(item: Omit<Picture, 'user_created' | 'id' | 'date_created'>) {
        return this.http.post(this.API_URL, { ...item });
    }

    addFile(imageFile: FormData): Observable<FileUploadApiResponse> {
        return this.http.post<FileUploadApiResponse>(this.FILE_URL, imageFile);
    }

    updatePicture(id: number, is_open: boolean) {
        return this.http.patch(this.API_URL + '/' + id, {
            is_open,
        });
    }
}
