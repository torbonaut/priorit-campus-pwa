import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { mergeMap, tap } from "rxjs";
import { EmptyUserState } from "../user/user.model";
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
        private readonly store: Store,
        private readonly authService: AuthService
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
        this.store.reset({ auth: EmptyAuthState, user: EmptyUserState });
    }
    
    @Action(Auth.Logout)
    logout(ctx: StateContext<AuthStateModel>) {
        const state = ctx.getState(); 
        return this.authService.logout(state.refreshToken).pipe(
            mergeMap( () => ctx.dispatch(new Auth.Clear()))
        );
    }
}