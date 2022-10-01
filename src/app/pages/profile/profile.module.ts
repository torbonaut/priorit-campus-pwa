import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NzButtonModule } from "ng-zorro-antd/button";
import { AppProfileRoutingModule } from "./profile-routing.module";
import { AppProfileComponent } from "./profile.component";
import { IconDefinition } from '@ant-design/icons-angular';
import {
    MailOutline,
    CrownOutline,
    UserOutline,
    EyeInvisibleOutline
} from '@ant-design/icons-angular/icons';
import { NzIconModule } from "ng-zorro-antd/icon";

const icons: IconDefinition[] = [UserOutline, MailOutline, CrownOutline, EyeInvisibleOutline];

@NgModule({
    declarations: [
        AppProfileComponent
    ],
    imports: [AppProfileRoutingModule, CommonModule, NzButtonModule, NzIconModule.forChild(icons)],
    exports:[AppProfileComponent]
})
export class ProfileModule { }