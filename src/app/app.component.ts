import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Navigate, RouterNavigation } from '@ngxs/router-plugin';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppHeaderTitleService } from './app-header-title.service';
import { Auth } from './core/auth/auth.actions';
import { AuthState } from './core/auth/auth.state';
import { User } from './core/user/user.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {
    private unsubscribe$: Subject<void> = new Subject();
    headerTitle$: Observable<string>;
    isCollapsed = true;
    isAuthenticated$: Observable<boolean>;

    constructor(
        headerTitleService: AppHeaderTitleService,
        private readonly msg: NzMessageService,
        private readonly store: Store,
        private readonly actions$: Actions
    ) {
        this.headerTitle$ = headerTitleService.get();

        this.actions$
            .pipe(ofActionSuccessful(Auth.Logout), takeUntil(this.unsubscribe$))
            .subscribe(() => {
                this.msg.info('Sie wurden abgemeldet.');
                this.store.dispatch(new Navigate(['/login']));
            });

        this.actions$
            .pipe(
                ofActionSuccessful(RouterNavigation),
                takeUntil(this.unsubscribe$)
            )
            .subscribe(() => {
                this.isCollapsed = true;
            });

        this.isAuthenticated$ = this.store.select(AuthState.isAuthenticated);

        this.isAuthenticated$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((isAuthenticated) => {
                if (isAuthenticated) {
                    this.store.dispatch(new User.GetCurrent());
                }
            });

        this.actions$
            .pipe(ofActionSuccessful(Auth.Login), takeUntil(this.unsubscribe$))
            .subscribe(() => {
                this.store.dispatch(new Navigate(['/member/dashboard']));
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    logout() {
        this.store.dispatch(new Auth.Logout());
    }
}
