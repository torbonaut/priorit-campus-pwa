import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AppHeaderTitleService } from "src/app/app-header-title.service";

@Component({
    selector: 'app-what-would-i-be-as',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./what-would-i-be-as.component.scss'],
    templateUrl: './what-would-i-be-as.component.html'
})
export class WhatWouldIBeAsComponent {
    constructor(private readonly headerTitleService: AppHeaderTitleService) {
        this.headerTitleService.set('Was wäre ich als ... ?');
    }
}