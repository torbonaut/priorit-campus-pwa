import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { mergeMap, tap } from "rxjs";
import { Pictures } from "./picture-it.actions";
import { EmptyPictureState, FileUploadApiResponse, Picture, PictureItApiResponse, PicturesStateModel } from "./picture-it.model";
import { PictureItService } from "./picture-it.service";

@State({
    name: 'pictures',
    defaults: EmptyPictureState
})
@Injectable()
export class PicturesState {
    constructor(
        private readonly pictureItService: PictureItService,
        private readonly store: Store
    ) { }

    @Selector()
    static all(state: PicturesStateModel) {
        const items: { [key: number]: Picture } = { ...state.items };

        return Object.keys(items).map(key => items[parseInt(key)]);
    }

    @Action(Pictures.Update)
    update(ctx: StateContext<PicturesStateModel>, action: Pictures.Update) {
        return this.pictureItService.updatePicture(action.payload.id, action.payload.is_open).pipe(
            mergeMap(() => this.store.dispatch(new Pictures.Refresh))
        );
    }

    @Action(Pictures.LoadAll)
    loadAll(ctx: StateContext<PicturesStateModel>, action: Pictures.LoadAll) {
        return this.pictureItService.loadPictures()
            .pipe(
                tap((response: PictureItApiResponse) => {
                    const ids: number[] = [];
                    const items: { [key: number]: Picture } = {};

                    response.data.forEach((item: Picture) => {
                        ids.push(item.id);
                        items[item.id] = item;
                    });

                    ctx.setState({ ids, items });
                })
            );
    }

    @Action(Pictures.Add)
    add(ctx: StateContext<PicturesStateModel>, action: Pictures.Add) {
        return this.pictureItService.addPicture(action.payload);
    }

    @Action(Pictures.UploadFile)
    uploadFile(ctx: StateContext<PicturesStateModel>, action: Pictures.UploadFile) {
        return this.pictureItService.addFile(action.payload.file).pipe(
            mergeMap((uploadRes: FileUploadApiResponse) =>
            {
                return this.store.dispatch(
                    new Pictures.Add({
                        title: action.payload.title,
                        tip: action.payload.tip,
                        is_open: true,
                        picture: uploadRes.data.id
                    }));
                }
            )
        );
    }

}
