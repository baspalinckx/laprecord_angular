import { Component, OnInit, Input } from '@angular/core';

import { Record } from '../../record.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './record-item.component.html',
  styleUrls: ['./record-item.component.css']
})
export class RecordItemComponent implements OnInit {
  @Input() record: Record;
  @Input() index: string;

  ngOnInit() {
    this.index = this.record._id;
  }
}
