import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AppHeaderTitleService {
    private headerTitle$: Subject<string> = new Subject();

    set(title: string) {
        this.headerTitle$.next(title);
    }

    get(): Observable<string> {
        return this.headerTitle$.asObservable();
    }
}