
import { Picture, PictureClose, PictureUpload } from "./picture-it.model";

export namespace Pictures {

    export class Refresh {
        static readonly type = '[Pictures] Refresh Pictures';
    }

    export class LoadAll {
        static readonly type = '[Pictures] Load All';
    }

    export class LoadById {
        static readonly type = '[Pictures] Load By Id';
        constructor(public payload: number) {

        };
    }
    export class Add {
        static readonly type = '[Picture] Add';
        constructor(public payload: Omit<Picture, 'user_created' | 'id' | 'date_created'>) {}
    }

    export class UploadFile {
        static readonly type = '[Picture] Upload Image';
        constructor(public payload: PictureUpload) {}
    }
    export class Update {
        static readonly type = '[Pictures] Update';
        constructor(public payload: PictureClose) {}
}

}
