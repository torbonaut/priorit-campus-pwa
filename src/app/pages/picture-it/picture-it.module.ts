import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { PictureItRoutingModule } from "./picture-it-routing.module";
import { PictureItComponent } from "./picture-it.component";

@NgModule({
    declarations: [
        PictureItComponent
    ],
    imports: [
        PictureItRoutingModule,
        CommonModule,
        NzFormModule,
        NzSelectModule,
        NzDatePickerModule,
        NzButtonModule],
    exports: [PictureItComponent]
})
export class PictureItModule { }
