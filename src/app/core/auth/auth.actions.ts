import { AuthCredentials } from "./auth.model";

export namespace Auth {
    export class Login {
        static readonly type = '[Auth] Login';
        constructor(public payload: AuthCredentials) { }
    }

    export class Refresh {
        static readonly type = '[Auth] Refresh';
    }

    export class Clear {
        static readonly type = '[Auth] Clear';
    }

    export class Logout {
        static readonly type = '[Auth] Logout';
    }
}