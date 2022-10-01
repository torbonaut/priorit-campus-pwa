import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PictureTipComponent } from "./picture-tip.component";

const PICTURE__IT_ROUTES: Routes = [
    {
        path: 'picture/:id',
        component: PictureTipComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(PICTURE__IT_ROUTES)
    ],
    exports: [RouterModule]
})
export class PictureTipRoutingModule { }
