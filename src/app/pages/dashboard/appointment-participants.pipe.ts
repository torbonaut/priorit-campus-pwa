import { Pipe, PipeTransform } from "@angular/core";
import { UserStateModel } from "../../core/user/user.model";
import { Appointment } from "../../core/appointments/appointments.model";

@Pipe({
    name: 'appointmentUsers'
})
export class AppointmentUsersPipe implements PipeTransform {
    transform(app: Appointment, ...args: any[]): string {
        let names: string[] = [];
        if (app) {
            if (app.participants) {
                const participants = JSON.parse(app.participants);

                participants.forEach((item: any) => { names.push(item.userName) });
            }
            
        }

        return names.join(', ');
    }
}