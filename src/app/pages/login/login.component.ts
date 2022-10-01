import { ChangeDetectionStrategy, Component, NgZone, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofActionErrored, ofActionSuccessful, Store } from '@ngxs/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject, takeUntil } from 'rxjs';
import { AppHeaderTitleService } from 'src/app/app-header-title.service';
import { Auth } from 'src/app/core/auth/auth.actions';

@Component({
    selector: 'app-login',
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLoginComponent implements OnDestroy {
    private unsubscribe$: Subject<void> = new Subject();

    userName: string = "";
    password: string = "";


    constructor(
        headerTitleService: AppHeaderTitleService,
        private readonly router: Router,
        private readonly store: Store,
        private readonly actions$: Actions,
        private readonly msg: NzMessageService,
        private readonly ngZone: NgZone
    ) {
        headerTitleService.set('Anmelden');

        this.actions$
            .pipe(
                ofActionSuccessful(Auth.Login),
                takeUntil(this.unsubscribe$)
            )
            .subscribe(() => { this.ngZone.run(() => this.router.navigateByUrl('/member/dashboard')); });

        this.actions$
            .pipe(
                ofActionErrored(Auth.Login),
                takeUntil(this.unsubscribe$))
            .subscribe(() => this.msg.error('Benutzername oder Passwort falsch!'))
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    login() {
        this.store.dispatch(
            new Auth.Login({
                email: this.userName,
                password: this.password,
            })
        );
    }
}
