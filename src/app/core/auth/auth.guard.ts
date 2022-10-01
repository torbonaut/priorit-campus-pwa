import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Navigate } from "@ngxs/router-plugin";
import { Store } from "@ngxs/store";
import { NzMessageService } from "ng-zorro-antd/message";
import { Observable, tap } from "rxjs";
import { Auth } from "./auth.actions";
import { AuthState } from "./auth.state";

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {
    isAuthenticated$: Observable<boolean>;
        
    constructor(
        private readonly msg: NzMessageService,
        private readonly store: Store,
    ) {
        this.isAuthenticated$ = this.store.select( AuthState.isAuthenticated);
    }
    
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        return this.isAuthenticated$.pipe(
            tap((isAuthenticated: boolean) => {
                if (!isAuthenticated) {
                    this.store.dispatch(new Auth.Logout());
                    this.msg.warning('Sie haben keine Berechtigung.');
                    this.store.dispatch(new Navigate(['/login']));
                }
            })
        );
    }
}