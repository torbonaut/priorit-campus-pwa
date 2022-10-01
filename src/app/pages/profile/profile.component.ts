import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { AppHeaderTitleService } from "src/app/app-header-title.service";
import { UserStateModel } from "src/app/core/user/user.model";
import { UserState } from "src/app/core/user/user.state";

@Component({
    selector: 'app-profile',
    styleUrls: ['./profile.component.scss'],
    templateUrl: './profile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppProfileComponent {
    userData$: Observable<UserStateModel>;

    constructor(
        headerTitleService: AppHeaderTitleService,
        store: Store
    ) { 
        headerTitleService.set('Benutzerprofil');

        this.userData$ = store.select(UserState.userData);
    }
}