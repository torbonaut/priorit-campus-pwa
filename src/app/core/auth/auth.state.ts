import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { finalize, of, tap } from "rxjs";
import { Auth } from "./auth.actions";
import { AuthResponse, AuthStateModel, EmptyAuthState } from "./auth.model";
import { AuthService } from "./auth.service";

@State<AuthStateModel>({
    name: 'auth',
    defaults: EmptyAuthState
})
@Injectable()
export class AuthState {
    constructor(
        private readonly authService: AuthService,
        private readonly store: Store
    ) { }

    @Selector()
    static isAuthenticated(state: AuthStateModel) {
        return !!state.accessToken;
    }

    @Selector()
    static accessToken(state: AuthStateModel) {
        return state.accessToken;
    }

    @Selector()
    static refreshToken(state: AuthStateModel) {
        return state.refreshToken;
    }

    @Action(Auth.Login)
    login(ctx: StateContext<AuthStateModel>, action: Auth.Login) {
        return this.authService.authenticate(action.payload).pipe(
            tap((response: AuthResponse) => {
                ctx.setState({
                    accessToken: response.data.access_token,
                    refreshToken: response.data.refresh_token
                });
            })
        )
    }

    @Action(Auth.Refresh)
    refresh(ctx: StateContext<AuthStateModel>, action: Auth.Refresh) {
        const state = ctx.getState();
        return this.authService.refresh(state.refreshToken).pipe(
            tap((response: AuthResponse) => {
                ctx.setState({
                    accessToken: response.data.access_token,
                    refreshToken: response.data.refresh_token
                });
            })
        );    
    }

    @Action(Auth.Clear)
    clear(ctx: StateContext<AuthStateModel>, action: Auth.Clear) {
        ctx.setState(EmptyAuthState);
    }
    
    @Action(Auth.Logout)
    logout(ctx: StateContext<AuthStateModel>) {
        const state = ctx.getState();
        return this.authService.logout(state.refreshToken).pipe(
            finalize(() => { this.store.reset({}) })
        );
    }
}