import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { User } from "./user.actions";
import { EmptyUserState, UserApiResponse, UserStateModel } from "./user.model";
import { UserService } from "./user.service";

@State<UserStateModel>({
    name: 'user',
    defaults: EmptyUserState
})
@Injectable()
export class UserState  {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Selector()
    static isLoaded(state: UserStateModel) {
        return !!state.id;
    }

    @Selector()
    static userData(state: UserStateModel) {
        return state;
    }
    
    @Action(User.GetCurrent)
    getCurrent(ctx: StateContext<UserStateModel>, action: User.GetCurrent) {
        return this.userService.getCurrentUser().pipe(
            tap((response: UserApiResponse) => {
                const newState = {
                    id: response.data.id,
                    firstname: response.data.first_name,
                    lastname: response.data.last_name,
                    description: response.data.description,
                    email: response.data.email,
                    status: response.data.status,
                    title: response.data.title,
                    avatar: response.data.avatar,
                };
                
                ctx.setState(newState);
            })
        );
    }
}