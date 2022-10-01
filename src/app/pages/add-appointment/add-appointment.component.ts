import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppHeaderTitleService } from 'src/app/app-header-title.service';
import { User } from 'src/app/core/user/user.actions';
import { UserStateModel } from 'src/app/core/user/user.model';
import { UserState } from 'src/app/core/user/user.state';
import { Appointments } from 'src/app/core/appointments/appointments.actions';
import { FormControl, FormGroup } from '@angular/forms';
import { Navigate } from '@ngxs/router-plugin';

@Component({
    selector: 'add-appointment',
    styleUrls: ['./add-appointment.component.scss'],
    templateUrl: './add-appointment.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddAppointmentComponent implements OnInit, OnDestroy {
    private unsubscribe$: Subject<void> = new Subject();
    userData$: Observable<UserStateModel>;
    form = new FormGroup({
        category: new FormControl(''),
        title: new FormControl(''),
        appointmentDateTime: new FormControl(new Date()),
    });

    selectedUsers: string[] = [];
    availableUsers: string[] = [
        "Rene 'grumpymorningface' Rassnitzer",
        "Andrea 'evilface' Svetnik",
        "Raimund 'Bierolee' Antonitsch",
    ];

    constructor(
        headerTitleService: AppHeaderTitleService,
        private store: Store,
        private readonly actions$: Actions
    ) {
        headerTitleService.set('Neue Aktivität');

        this.userData$ = store.select(UserState.userData);

        this.actions$
            .pipe(
                ofActionSuccessful(Appointments.Add),
                takeUntil(this.unsubscribe$)
            )
            .subscribe(() => {
                this.store.dispatch(new Navigate(['/member/dashboard']));
            });
    }

    ngOnInit(): void {
        const isUserLoaded: boolean = this.store.selectSnapshot<boolean>(
            UserState.isLoaded
        );

        if (!isUserLoaded) {
            this.store.dispatch(new User.GetCurrent());
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    submitForm(): void {
        this.userData$.subscribe((user) =>
            this.store.dispatch(
                new Appointments.Add({
                    appointmentDateTime:
                        this.form.value.appointmentDateTime
                            ?.toISOString()
                            .replace(/.\d+Z$/g, '') || '',
                    category: this.form.value.category || '',
                    title: this.form.value.title || '',
                    participants: JSON.stringify([
                        {
                            userId: user.id,
                            userName:
                                user.firstname +
                                ' ' +
                                user.lastname.charAt(0) +
                                '.',
                        },
                    ]),
                    avatar: user.avatar,
                })
            )
        );
    }
}
