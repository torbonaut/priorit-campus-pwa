import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { mergeMap, tap } from "rxjs";
import { PictureTips } from "./picture-tip.actions";
import { EmptyPictureTipState, PictureTip, PictureTipApiResponse, PictureTipStateModel } from "./picture-tip.model";
import { PictureTipService } from "./picture-tip.service";

@State({
    name: 'picturetips',
    defaults: EmptyPictureTipState
})
@Injectable()
export class PictureTipState {
    constructor(
        private readonly pictureTipService: PictureTipService,
        private readonly store: Store
    ) { }

    @Selector()
    static all(state: PictureTipStateModel) {
        const items: { [key: number]: PictureTip } = { ...state.items };

        return Object.keys(items).map(key => items[parseInt(key)]);
    }
    
    @Action(PictureTips.Add)
    add(ctx: StateContext<PictureTipStateModel>, action: PictureTips.Add) {

        return this.pictureTipService.addPictureTips(action.payload).pipe(
            tap( (response: { data: PictureTip }) => {
                const state = ctx.getState();
                const ids = [...state.ids];
                const items = { ...state.items };
                const newItem = {...response.data };
                ids.push(response.data.id);
                items[response.data.id] = newItem;

                ctx.setState({ items, ids });

            }),
            mergeMap(() => this.store.dispatch(new PictureTips.Refresh))
        );
    }

    @Action(PictureTips.Update)
    update(ctx: StateContext<PictureTipStateModel>, action: PictureTips.Update) {
        return this.pictureTipService.updatePictureTips(action.payload.id, action.payload.is_correct).pipe(
            mergeMap(() => this.store.dispatch(new PictureTips.Refresh))
        );
    }
 
    @Action(PictureTips.LoadAll)
    loadAll(ctx: StateContext<PictureTipStateModel>, action: PictureTips.LoadAll) {
        return this.pictureTipService.loadPictureTips()
            .pipe(
                tap((response: PictureTipApiResponse) => {
                    const ids: number[] = [];
                    const items: { [key: number]: PictureTip } = { };

                    response.data.forEach((item: PictureTip) => { 
                        ids.push(item.id);
                        items[item.id] = item;
                    });

                    ctx.setState({ ids, items });
                })
            );
    }

}