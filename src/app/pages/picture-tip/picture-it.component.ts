import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Store } from "@ngxs/store";
import { filter, map, Observable, pipe, Subject, Subscription, takeUntil, tap, withLatestFrom } from 'rxjs';
import { AppHeaderTitleService } from "src/app/app-header-title.service";
import { Pictures } from "src/app/core/picture-it/picture-it.actions";
import { Picture } from "src/app/core/picture-it/picture-it.model";
import { PicturesState } from "src/app/core/picture-it/picture-it.state";
import { User } from "src/app/core/user/user.actions";
import { UserStateModel } from "src/app/core/user/user.model";
import { UserState } from "src/app/core/user/user.state";

@Component({
    selector: 'picture-it',
    styleUrls: ['./picture-it.component.scss'],
    templateUrl: './picture-it.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PictureItComponent {

    allPictures$: Observable<Picture[]>;
    newPictures$: Observable<Picture[]>;
    oldPictures$: Observable<Picture[]>;
    user$: Observable<UserStateModel>;

    constructor(
        headerTitleService: AppHeaderTitleService,
        private readonly store: Store
    ) {
        headerTitleService.set('Tipp abgeben');

        this.store.dispatch(new Pictures.LoadAll());
        this.user$ = this.store.select(UserState.userData);
        this.allPictures$ = this.store.select(PicturesState.all);

        this.newPictures$ = this.allPictures$.pipe(
            withLatestFrom(this.user$),
            map(([pictures]) =>
                pictures.filter((item) => item.is_open)
            )
        );
        
        this.oldPictures$ = this.allPictures$.pipe(
            withLatestFrom(this.user$),
            map(([pictures]) =>
                pictures.filter((item) => !item.is_open)
            )
        );

    }

}
