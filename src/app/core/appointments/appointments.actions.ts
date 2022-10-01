import { Appointment } from "./appointments.model";

export namespace Appointments {
    export class Refresh {
        static readonly type = '[Appointments] Refresh Appointments';
    }

    export class LoadAll {
        static readonly type = '[Appointments] Load All';
    }

    export class LoadOne {
        static readonly type = '[Appointments] Load One';
        constructor(public payload: number) {}
    }

    export class Add {
        static readonly type = '[Appointments] Add';
        constructor(public payload: Omit<Appointment, 'id' | 'user_created' | 'date_created'>) {}
    }

    export class Delete {
        static readonly type = '[Appointments] Delete';
        constructor(public payload: number) {}
    }

    export class AddUser {
        static readonly type = '[Appointments] Add User';
        constructor(public payload: { appointmentId: number, userId: string, userName: string }) {}
    }

    export class RemoveUser {
        static readonly type = '[Appointments] Remove User';
        constructor(public payload: { appointmentId: number, userId: string}) {}
    }
}
