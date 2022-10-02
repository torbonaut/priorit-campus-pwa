import { Injectable, OnDestroy } from '@angular/core';
import {
    Action,
    Actions,
    ofActionSuccessful,
    Selector,
    State,
    StateContext,
    Store,
} from '@ngxs/store';
import { Subject, takeUntil, tap } from 'rxjs';
import { Auth } from '../auth/auth.actions';
import { User } from './user.actions';
import { EmptyUserState, UserApiResponse, UserStateModel } from './user.model';
import { UserService } from './user.service';

@State<UserStateModel>({
    name: 'user',
    defaults: EmptyUserState,
})
@Injectable()
export class UserState implements OnDestroy {
    private unsubscribe$: Subject<void> = new Subject();

    constructor(
        private readonly userService: UserService,
        private readonly actions$: Actions,
        private readonly store: Store
    ) {
        this.actions$
            .pipe(ofActionSuccessful(Auth.Clear), takeUntil(this.unsubscribe$))
            .subscribe(() => {
                this.store.dispatch(new User.Clear());
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    @Selector()
    static isLoaded(state: UserStateModel) {
        return !!state.id;
    }

    @Selector()
    static userData(state: UserStateModel) {
        return state;
    }

    @Action(User.GetCurrent)
    getCurrent(ctx: StateContext<UserStateModel>, action: User.GetCurrent) {
        return this.userService.getCurrentUser().pipe(
            tap((response: UserApiResponse) => {
                const newState = {
                    id: response.data.id,
                    firstname: response.data.first_name,
                    lastname: response.data.last_name,
                    description: response.data.description,
                    email: response.data.email,
                    status: response.data.status,
                    title: response.data.title,
                    avatar: response.data.avatar,
                };

                ctx.setState(newState);
            })
        );
    }

    @Action(User.Clear)
    clear(ctx: StateContext<UserStateModel>, action: User.Clear) {
        ctx.setState(EmptyUserState);
    }
}
