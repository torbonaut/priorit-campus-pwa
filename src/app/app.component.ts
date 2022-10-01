import { ChangeDetectionStrategy, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppHeaderTitleService } from './app-header-title.service';
import { Auth } from './core/auth/auth.actions';
import { AuthState } from './core/auth/auth.state';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
    private unsubscribe$: Subject<void> = new Subject();
    headerTitle$: Observable<string>;
    isCollapsed = true;
    isAuthenticated$: Observable<boolean>;

    constructor(
        headerTitleService: AppHeaderTitleService,
        private readonly router: Router,
        private readonly msg: NzMessageService,
        private readonly store: Store,
        private readonly actions$: Actions,
        private readonly ngZone: NgZone
    ) {
        this.headerTitle$ = headerTitleService.get();

        this.actions$
            .pipe(ofActionSuccessful(Auth.Logout), takeUntil(this.unsubscribe$))
            .subscribe(() => {
                this.ngZone.run( () => this.router.navigateByUrl('/login'))
                
                this.isCollapsed = true;
                this.msg.info('Sie wurden abgemeldet.');
            });

        this.isAuthenticated$ = this.store.select(AuthState.isAuthenticated);

        
    }

    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    navigate(path: string): string {
        //this.isCollapsed = true;
        return path;
    }

    logout() {
        this.store.dispatch(new Auth.Logout());
    }
}
