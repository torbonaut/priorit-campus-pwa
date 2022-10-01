import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Appointment, AppointmentsApiResponse } from "./appointments.model";

@Injectable()
export class AppointmentsService {
    private readonly API_URL = 'https://k9i9drz6.directus.app/items/appointments';

    constructor(private readonly http: HttpClient) {}

    loadAppointment(id: number) {}

    loadAppointments(): Observable<AppointmentsApiResponse> {
        return this.http.get<AppointmentsApiResponse>(this.API_URL);
    }

    addAppointment(item: Omit<Appointment, "id" | 'user_created' | 'date_created'>) {
        return this.http.post(this.API_URL, { ...item });
    }

    addUser(id: number, participants: string) {

        return this.http.patch(this.API_URL + '/' + id, {
                id,
                participants
            }
        );
    }

    deleteAppointment(id: number) {
        return this.http.delete(this.API_URL + '/' + id);
    }
}
