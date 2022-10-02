import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, fromEvent, map, merge, Observable, startWith, Subject, takeUntil } from "rxjs";

@Injectable({ providedIn: 'root' })
export class NetworkService implements OnDestroy {
    private unsubscribe$: Subject<void> = new Subject();

    isOnline$: BehaviorSubject<boolean> = new BehaviorSubject(navigator.onLine);

    constructor() {
        merge(
            fromEvent(window, 'online'),
            fromEvent(window, 'offline')
        ).pipe(
            map(() => navigator.onLine),
            startWith(navigator.onLine),
            takeUntil(this.unsubscribe$)
        ).subscribe( () => { this.isOnline$.next(navigator.onLine) });
                
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}