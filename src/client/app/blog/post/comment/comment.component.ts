import { Component, OnInit, Input } from '@angular/core';

import { WpConfig, Comment } from '../../../models/wp.config.interface';

@Component({
    moduleId: module.id,
    selector: 'bp-comment',
    templateUrl: 'comment.component.html',
    styleUrls: ['comment.component.css']
})
export class CommentComponent implements OnInit {

    @Input() comment: Comment | Comment[];

    constructor() {}

    ngOnInit() {}

    get COMMENT_STATUS(): Object {
        return {
            'APPROVED': 'approved',
            'OPEN':     'open',
            'CLOSED':   'closed',
            'HOLD': 'hold'
        };
    }

}
