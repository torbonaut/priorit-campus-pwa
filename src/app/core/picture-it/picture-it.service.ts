import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FileUploadApiResponse, Picture, PictureItApiResponse } from "./picture-it.model";

@Injectable()
export class PictureItService {
    private readonly API_URL = 'https://k9i9drz6.directus.app/items/picture_it';
    private readonly FILE_URL = 'https://k9i9drz6.directus.app/files';

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
                is_open
            }
        );
    }
}
