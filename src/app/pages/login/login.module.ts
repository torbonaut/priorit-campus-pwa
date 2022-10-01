import { NgModule } from "@angular/core";
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { LoginRouterModule } from "./login-routing.module";
import { AppLoginComponent } from "./login.component";
import { FormsModule } from "@angular/forms";
import { NzMessageModule } from 'ng-zorro-antd/message';

@NgModule({
    declarations: [AppLoginComponent],
    imports: [LoginRouterModule, FormsModule, NzFormModule, NzButtonModule, NzMessageModule],
    exports: []
})
export class LoginModule { }
