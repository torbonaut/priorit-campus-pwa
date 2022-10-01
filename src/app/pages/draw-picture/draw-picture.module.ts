import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { DrawPictureRoutingModule } from "./draw-picture-routing.module";
import { DrawPictureComponent } from "./draw-picture.component";
import { ReactiveFormsModule  } from "@angular/forms";
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
    declarations: [
        DrawPictureComponent
    ],
    imports: [
        DrawPictureRoutingModule,
        NzButtonModule,
        CommonModule,
        ReactiveFormsModule,
        NzFormModule,
        NzGridModule
      ],
    exports: [DrawPictureComponent]
})
export class DrawPictureModule { }
