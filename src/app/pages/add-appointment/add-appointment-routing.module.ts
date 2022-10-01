import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddAppointmentComponent } from "./add-appointment.component";

const ADD_APPOINTMENT_ROUTES: Routes = [
    {
        path: '',
        component: AddAppointmentComponent
    },
    {
        path: '',
        component: AddAppointmentComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(ADD_APPOINTMENT_ROUTES)
    ],
    exports: [RouterModule]
})
export class AddAppointmentRoutingModule { }
