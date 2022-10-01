import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { AppointmentsService } from "./appointments/appointments.service";
import { AppointmentsState } from "./appointments/appointments.state";
import { AuthService } from "./auth/auth.service";
import { AuthState } from "./auth/auth.state";
import { PictureItService } from "./picture-it/picture-it.service";
import { PicturesState } from "./picture-it/picture-it.state";
import { PictureTipService } from "./picture-tip/picture-tip.service";
import { PictureTipState } from "./picture-tip/picture-tip.state";
import { UserService } from "./user/user.service";
import { UserState } from "./user/user.state";

@NgModule({
    declarations: [],
    imports: [HttpClientModule, NgxsModule.forFeature([AuthState, UserState, AppointmentsState, PicturesState, PictureTipState])],
    exports: [HttpClientModule],
    providers: [AuthService, UserService, AppointmentsService, PictureItService, PictureTipService]
})
export class CoreModule {}