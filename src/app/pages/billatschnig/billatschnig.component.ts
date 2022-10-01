import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AppHeaderTitleService } from "src/app/app-header-title.service";

@Component({
    selector: 'app-billatschnig',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./billatschnig.component.scss'],
    templateUrl: './billatschnig.component.html'
})
export class BillatschnigComponent {
    constructor(headerTitleService: AppHeaderTitleService) {
        headerTitleService.set('A gemma Billatschnig?');
    }
}