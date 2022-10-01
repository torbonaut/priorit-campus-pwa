import { PictureTip, PictureTipClose } from "./picture-tip.model";

export namespace PictureTips {

    export class Refresh {
        static readonly type = '[PictureTips] Refresh Pictures';
    }

    export class LoadAll {
        static readonly type = '[PictureTips] Load All';
    }

    export class Add {
        static readonly type = '[PictureTips] Add';
        constructor(public payload: Omit<PictureTip, 'id' | 'user_created' | 'date_created'>) {}
    }

    export class Update {
        static readonly type = '[PictureTips] Update';
        constructor(public payload: PictureTipClose) {}
    }

}