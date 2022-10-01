import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { PictureTipRoutingModule } from "./picture-tip-routing.module";
import { PictureTipComponent } from "./picture-tip.component";
import { ReactiveFormsModule  } from "@angular/forms";

@NgModule({
    declarations: [
        PictureTipComponent
    ],
    imports: [
        PictureTipRoutingModule,
        CommonModule,
        NzFormModule,
        NzSelectModule,
        NzDatePickerModule,
        NzButtonModule,
        ReactiveFormsModule],
    exports: [PictureTipComponent]
})
export class PictureTipModule { }
