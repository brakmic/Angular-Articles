import { Component, OnInit,
         Input, SimpleChanges,
         ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'console',
    templateUrl: './console.component.html',
    styleUrls: ['./console.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsoleComponent implements OnInit {
    @Input() public message: any;
    private messages: any[] = [];

    constructor(private cd: ChangeDetectorRef) { }

    public ngOnInit() {

    }

    public ngOnChanges(changes: SimpleChanges) {
        const message = changes['message'];
        if (this.messages.length >= 10) {
            this.messages = _.slice(this.messages, 1);
        }
        this.messages.push(message.currentValue);
    }
}
