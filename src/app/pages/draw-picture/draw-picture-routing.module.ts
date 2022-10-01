import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DrawPictureComponent } from "./draw-picture.component";

const DRAW_PICTURE_ROUTES: Routes = [
    {
        path: '',
        component: DrawPictureComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(DRAW_PICTURE_ROUTES)
    ],
    exports: [RouterModule]
})
export class DrawPictureRoutingModule { }
