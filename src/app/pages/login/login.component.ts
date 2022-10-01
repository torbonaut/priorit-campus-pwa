import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {
    Actions,
    ofActionErrored,
    Store,
} from '@ngxs/store';
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

    userName: string = '';
    password: string = '';

    constructor(
        headerTitleService: AppHeaderTitleService,
        private readonly store: Store,
        private readonly actions$: Actions,
        private readonly msg: NzMessageService
    ) {
        headerTitleService.set('Anmelden');

        this.actions$
            .pipe(ofActionErrored(Auth.Login), takeUntil(this.unsubscribe$))
            .subscribe(() =>
                this.msg.error('Benutzername oder Passwort falsch!')
            );
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
