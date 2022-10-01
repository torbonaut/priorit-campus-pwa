import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { map, Observable, Subject, takeUntil, withLatestFrom } from 'rxjs';
import { AppHeaderTitleService } from 'src/app/app-header-title.service';
import { Pictures } from 'src/app/core/picture-it/picture-it.actions';
import {
    Picture,
    PictureClose,
} from 'src/app/core/picture-it/picture-it.model';
import { PicturesState } from 'src/app/core/picture-it/picture-it.state';
import { PictureTips } from 'src/app/core/picture-tip/picture-tip.actions';
import {
    PictureTip,
    PictureTipClose,
} from 'src/app/core/picture-tip/picture-tip.model';
import { PictureTipState } from 'src/app/core/picture-tip/picture-tip.state';
import { UserStateModel } from 'src/app/core/user/user.model';
import { UserState } from 'src/app/core/user/user.state';

@Component({
    selector: 'picture-tip',
    styleUrls: ['./picture-tip.component.scss'],
    templateUrl: './picture-tip.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PictureTipComponent implements OnDestroy {
    private unsubscribe$: Subject<void> = new Subject();
    userData$: Observable<UserStateModel>;
    allPictures$: Observable<Picture[]>;
    picture$: Observable<Picture | undefined>;
    pictureId: number;
    user$: Observable<UserStateModel>;
    isMyPicture: boolean;

    allPictureTips$: Observable<PictureTip[]>;

    form = new FormGroup({
        myTip: new FormControl(''),
    });

    constructor(
        headerTitleService: AppHeaderTitleService,
        private readonly store: Store,
        private route: ActivatedRoute,
        private readonly actions$: Actions
    ) {
        this.pictureId = 0;
        this.route.params.subscribe((params) => {
            this.pictureId = +params['id'];
        });

        this.isMyPicture = false;

        headerTitleService.set('Tipp abgeben');

        this.store.dispatch(new Pictures.LoadAll());
        this.store.dispatch(new PictureTips.LoadAll());
        this.user$ = this.store.select(UserState.userData);
        this.userData$ = store.select(UserState.userData);
        this.allPictures$ = this.store.select(PicturesState.all);

        this.picture$ = this.allPictures$.pipe(
            map((pictures) =>
                pictures.find((item) => item.id === this.pictureId)
            )
        );

        this.picture$.subscribe((picture) => {
            this.userData$.subscribe((user) => {
                if (user.id === picture?.user_created) {
                    this.isMyPicture = true;
                }
            });
        });

        this.allPictureTips$ = this.store.select(PictureTipState.all);
        this.allPictureTips$ = this.allPictureTips$.pipe(
            withLatestFrom(this.user$),
            map(([tip]) =>
                tip.filter((item) => item.picture_id === this.pictureId)
            )
        );

        this.actions$
            .pipe(
                ofActionSuccessful(Pictures.Update),
                takeUntil(this.unsubscribe$)
            )
            .subscribe(() => {
                this.store.dispatch(new Navigate(['/member/picture-it']));
            });
    }

    submitForm(): void {
        this.store.dispatch(
            new PictureTips.Add({
                tip: this.form.value.myTip || '',
                is_correct: false,
                picture_id: this.pictureId,
            })
        );
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    acceptTip(tip: PictureTip) {
        const pictureTipClose: PictureTipClose = {
            id: tip.id,
            is_correct: true,
        };

        const pictureClose: PictureClose = {
            id: this.pictureId,
            is_open: false,
        };

        this.store.dispatch(new PictureTips.Update(pictureTipClose));
        this.store.dispatch(new Pictures.Update(pictureClose));
    }
}
