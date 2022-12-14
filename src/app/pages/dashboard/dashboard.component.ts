import { Component, OnDestroy } from '@angular/core';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
    combineLatest,
    combineLatestWith,
    filter,
    map,
    merge,
    mergeAll,
    Observable,
    Subject,
    takeUntil,
    tap,
} from 'rxjs';
import { AppHeaderTitleService } from 'src/app/app-header-title.service';
import { Appointments } from 'src/app/core/appointments/appointments.actions';
import { Appointment } from 'src/app/core/appointments/appointments.model';
import { AppointmentsState } from 'src/app/core/appointments/appointments.state';
import { Picture } from 'src/app/core/picture-it/picture-it.model';
import { PicturesState } from 'src/app/core/picture-it/picture-it.state';
import { UserStateModel } from 'src/app/core/user/user.model';
import { UserState } from 'src/app/core/user/user.state';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnDestroy {
    allAppointments$: Observable<Appointment[]>;
    myAppointments$: Observable<Appointment[]>;
    otherAppointments$: Observable<Appointment[]>;
    user$: Observable<UserStateModel>;
    unsubscribe$: Subject<void> = new Subject();
    pictures$: Observable<Picture[]>;

    constructor(
        private readonly headerTitleService: AppHeaderTitleService,
        private readonly store: Store,
        private readonly actions$: Actions,
        private readonly msg: NzMessageService
    ) {
        this.headerTitleService.set('Dashboard');

        this.store.dispatch(new Appointments.LoadAll());

        this.user$ = this.store.select(UserState.userData);

        this.pictures$ = this.store.select(PicturesState.all).pipe(
            filter((pictures) => !!pictures),
            map((pictures) => pictures.filter((item) => item.is_open === true))
        );

        this.allAppointments$ = this.store.select(AppointmentsState.all);

        this.myAppointments$ = this.allAppointments$.pipe(
            combineLatestWith(this.user$),
            filter(
                ([appointments, user]) =>
                    appointments !== undefined && user !== undefined
            ),
            map(([appointments, user]) =>
                appointments.filter((item) => {
                    if (item.user_created === user.id) {
                        return true;
                    }

                    if (item.participants) {
                        let participants = JSON.parse(item.participants);

                        if (
                            participants.find((p: any) => p.userId === user.id)
                        ) {
                            return true;
                        }
                    }
                    return false;
                })
            )
        );

        this.otherAppointments$ = combineLatest([
            this.allAppointments$,
            this.user$,
        ]).pipe(
            filter(
                ([appointments, user]) =>
                    appointments !== undefined && user !== undefined
            ),
            map(([appointments, user]) =>
                appointments.filter((item) => {
                    if (item.user_created === user.id) {
                        return false;
                    }

                    if (item.participants) {
                        let participants = JSON.parse(item.participants);

                        if (
                            participants.find((p: any) => p.userId === user.id)
                        ) {
                            return false;
                        }
                    }
                    return true;
                })
            )
        );

        this.actions$
            .pipe(
                ofActionSuccessful(Appointments.AddUser),
                takeUntil(this.unsubscribe$)
            )
          .subscribe(() => { this.msg.success('Aktivit??t zu eigenen Aktivit??ten hinzugef??gt'); });
      
      this.actions$
        .pipe(
          ofActionSuccessful(Appointments.RemoveUser),
          takeUntil(this.unsubscribe$)
        ).subscribe(() => { this.msg.success('Aktivit??t von eigenen Aktivit??ten entfernt'); });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    addUser(appointment: Appointment) {
        const user: UserStateModel = this.store.selectSnapshot(
            UserState.userData
        );

        const appointmentId = appointment.id;
        const userId = user.id;
        const userName = user.firstname + ' ' + user.lastname.charAt(0) + '.';

        this.store.dispatch(
            new Appointments.AddUser({ appointmentId, userId, userName })
        );
    }

    removeUser(appointment: Appointment) {
        const user = this.store.selectSnapshot(UserState.userData);
        const owner: boolean = appointment.user_created === user.id;

        if (owner === true) {
            this.store.dispatch(new Appointments.Delete(appointment.id));
            return;
        }

        this.store.dispatch(
            new Appointments.RemoveUser({
                appointmentId: appointment.id,
                userId: user.id,
            })
        );
    }
}
