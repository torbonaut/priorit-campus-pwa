export interface Appointment {
    id: number;
    user_created: string;
    date_created: string;
    appointmentDateTime: string;
    category: string;
    title: string;
    avatar: string;
    participants: string;
}

export interface AppointmentsStateModel {
    ids: number[];
    items: { [key: number]: Appointment };
}

export const EmptyAppointmentsState: AppointmentsStateModel = {
    ids: [],
    items: {}
}

export interface AppointmentsApiResponse {
    data: Appointment[];
}