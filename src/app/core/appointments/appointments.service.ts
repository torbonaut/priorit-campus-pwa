import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Appointment, AppointmentsApiResponse } from "./appointments.model";

@Injectable()
export class AppointmentsService {
    private readonly API_BASE_URL = environment.apiBaseUrl;
    private readonly API_URL = this.API_BASE_URL + '/items/appointments';

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
