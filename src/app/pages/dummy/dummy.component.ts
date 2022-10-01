import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Observable } from "rxjs";
import { AppHeaderTitleService } from "src/app/app-header-title.service";
import { DummyService } from "./dummy.service";

@Component({
    selector: 'app-dummy',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `{{ dummies$ | async | json }}`
})
export class DummyComponent {
    dummies$: Observable<any>;

    constructor(headerTitle: AppHeaderTitleService, private readonly dummyService: DummyService) {
        headerTitle.set('Dummy');

        this.dummies$ = this.dummyService.list();
    }
}