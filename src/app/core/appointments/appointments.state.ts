import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { mergeMap, tap } from 'rxjs';
import { Appointments } from './appointments.actions';
import {
    Appointment,
    AppointmentsApiResponse,
    AppointmentsStateModel,
    EmptyAppointmentsState,
} from './appointments.model';
import { AppointmentsService } from './appointments.service';

@State({
    name: 'appointments',
    defaults: EmptyAppointmentsState,
})
@Injectable()
export class AppointmentsState {
    constructor(
        private readonly appointmentsService: AppointmentsService,
        private readonly store: Store
    ) {}

    @Selector()
    static all(state: AppointmentsStateModel) {
        const items: { [key: number]: Appointment } = { ...state.items };

        return Object.keys(items).map((key) => items[parseInt(key)]);
    }

    @Action(Appointments.LoadAll)
    loadAll(
        ctx: StateContext<AppointmentsStateModel>,
        action: Appointments.LoadAll
    ) {
        return this.appointmentsService.loadAppointments().pipe(
            tap((response: AppointmentsApiResponse) => {
                const ids: number[] = [];
                const items: { [key: number]: Appointment } = {};

                response.data.forEach((item: Appointment) => {
                    ids.push(item.id);
                    items[item.id] = item;
                });

                ctx.setState({ ids, items });
            })
        );
    }

    @Action(Appointments.Add)
    add(ctx: StateContext<AppointmentsStateModel>, action: Appointments.Add) {
        return this.appointmentsService
            .addAppointment(action.payload)
            .pipe(
                mergeMap(() => this.store.dispatch(new Appointments.Refresh()))
            );
    }

    @Action(Appointments.Refresh)
    refresh(
        ctx: StateContext<AppointmentsStateModel>,
        action: Appointments.Refresh
    ) {
        return this.store.dispatch(new Appointments.LoadAll());
    }

    @Action(Appointments.AddUser)
    addUser(
        ctx: StateContext<AppointmentsStateModel>,
        action: Appointments.AddUser
    ) {
        const state = ctx.getState();
        const appointment = { ...state.items[action.payload.appointmentId] };

        let participants = [];
        if (appointment.participants) {
            participants = JSON.parse(appointment.participants);
        }

        participants.push({
            userId: action.payload.userId,
            userName: action.payload.userName,
        });

        const newAppointment = {
            ...appointment,
            participants: JSON.stringify(participants),
        };

        return this.appointmentsService
            .addUser(action.payload.appointmentId, JSON.stringify(participants))
            .pipe(
                tap(() => {
                    ctx.patchState({
                        items: {
                            ...state.items,
                            [action.payload.appointmentId]: newAppointment,
                        },
                    });
                })
            );
    }

    @Action(Appointments.RemoveUser)
    removeUser(
        ctx: StateContext<AppointmentsStateModel>,
        action: Appointments.RemoveUser
    ) {
        const state = ctx.getState();
        const appointment = { ...state.items[action.payload.appointmentId] };

        if (appointment.participants) {
            let participants = JSON.parse(appointment.participants);

            participants = participants.filter(
                (item: any) => item.userId !== action.payload.userId
            );

            const newAppointment = {
                ...appointment,
                participants: JSON.stringify(participants),
            };

            return this.appointmentsService
                .addUser(
                    action.payload.appointmentId,
                    JSON.stringify(participants)
                )
                .pipe(
                    tap(() => {
                        ctx.patchState({
                            items: {
                                ...state.items,
                                [action.payload.appointmentId]: newAppointment,
                            },
                        });
                    })
                );
        }
        return;
    }

    @Action(Appointments.Delete)
    delete(ctx: StateContext<AppointmentsStateModel>, action: Appointments.Delete) {
        return this.appointmentsService.deleteAppointment(action.payload).pipe(
            tap(() => {
                const state = ctx.getState();
                const items = { ...state.items };
                delete items[action.payload];
                ctx.patchState({ items });
            })
        )
    }
}
