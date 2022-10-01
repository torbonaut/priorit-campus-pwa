export interface PictureTip {
    id: number;
    tip: string;
    user_created: number;
    date_created: string;
    is_correct: boolean;
    picture_id: number;
}

export interface PictureTipClose {
    id: number;
    is_correct: boolean;
}

export interface PictureTipStateModel {
    ids: number[];
    items: { [key: number]: PictureTip };
}

export const EmptyPictureTipState: PictureTipStateModel = {
    ids: [],
    items: {}
}

export interface PictureTipApiResponse {
    data: PictureTip[];
}