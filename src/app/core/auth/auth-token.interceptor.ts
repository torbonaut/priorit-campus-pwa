import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { catchError, finalize, Observable, take, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NetworkService } from '../common/network.service';
import { Auth } from './auth.actions';
import { AuthState } from './auth.state';

@Injectable({ providedIn: 'root' })
export class AuthTokenInterceptor implements HttpInterceptor {
    private isRefreshing = false;

    constructor(private readonly store: Store) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = this.store.selectSnapshot<string>(AuthState.accessToken);

        if (token && req.url.includes(environment.apiBaseUrl)) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }

        return next.handle(req).pipe(
            catchError((error) => {
                if (
                    error instanceof HttpErrorResponse &&
                    !req.url.includes('auth/login') &&
                    error.status === 401
                ) {
                    return this.handle401Error(req, next);
                }

                this.isRefreshing = false;
                
                return throwError(() => error);
            })
        );
    }

    handle401Error(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (!this.isRefreshing) {
            this.isRefreshing = true;

            this.store
                .dispatch(new Auth.Refresh())
                .pipe(
                    take(1),
                    finalize(() => {
                        this.isRefreshing = false;
                    })
                )
                .subscribe(() => {
                    const newToken = this.store.selectSnapshot<string>(
                        AuthState.accessToken
                    );
                    return next.handle(
                        req.clone({
                            setHeaders: {
                                Authorization: `Bearer ${newToken}`,
                            },
                        })
                    );
                });
        }
        return next.handle(req);
    }
}
