import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';

const TITLE_PREFIX = 'priorIT Spaß am Campus - ';

export const ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/member/dashboard',
    },
    {
        path: 'member',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                loadChildren: () =>
                    import('./pages/dashboard/dashboard.module').then(
                        (m) => m.DashboardModule
                    ),
                title: TITLE_PREFIX + 'Dashboard',
            },
            {
                path: 'add-appointment',
                loadChildren: () =>
                    import('./pages/add-appointment/add-appointment.module').then(
                        (m) => m.AddAppointmentModule
                    ),
                title: TITLE_PREFIX + 'Neue Aktivität erstellen',
            },
            {
                path: 'picture-it',
                loadChildren: () =>
                    import('./pages/picture-it/picture-it.module').then(
                        (m) => m.PictureItModule
                    ),
                title: TITLE_PREFIX + 'Bilderrätsel',
            },
            {
                path: 'picture-tip',
                loadChildren: () =>
                    import('./pages/picture-tip/picture-tip.module').then(
                        (m) => m.PictureTipModule
                    ),
                title: TITLE_PREFIX + 'Bilderrätsel Tipp',
            },
            {
                path: 'profile',
                loadChildren: () =>
                    import('./pages/profile/profile.module').then(
                        (m) => m.ProfileModule
                    ),
                title: TITLE_PREFIX + 'Profil',
            },
            {
                path: 'billatschnig',
                loadChildren: () =>
                    import('./pages/billatschnig/billatschnig.module').then(
                        (m) => m.BillatschnigModule
                    ),
                title: TITLE_PREFIX + 'A gemma Billatschnig?',
            },
            {
                path: 'what-would-i-be-as',
                loadChildren: () =>
                    import('./pages/what-would-i-be-as/what-would-i-be-as.module').then(
                        (m) => m.WhatWouldIBeAsModule
                    ),
                title: TITLE_PREFIX + 'Was wäre ich als ...?'
                },
                {
                    path: 'draw-picture',
                    loadChildren: () =>
                        import('./pages/draw-picture/draw-picture.module').then(
                            (m) => m.DrawPictureModule
                        ),
                    title: TITLE_PREFIX + 'Bild zeichen',
                }

        ],
    },

    {
        path: 'login',
        loadChildren: () =>
            import('./pages/login/login.module').then((m) => m.LoginModule),
        title: TITLE_PREFIX + 'Anmelden',
    },
];
