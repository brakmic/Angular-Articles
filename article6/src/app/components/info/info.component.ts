import { Component, OnInit,
         Input, SimpleChanges,
         ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import * as _ from 'lodash';
import { ICustomerData } from 'app/interfaces';

@Component({
    selector: 'info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoComponent implements OnInit {
    @Input() public data: ICustomerData;

    constructor(private cd: ChangeDetectorRef) { }

    public ngOnInit() {
    }

    public ngOnChanges(changes: SimpleChanges) {
    }
}
