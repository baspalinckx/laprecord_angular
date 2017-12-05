import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Record } from '../record.model';
import { RecordService } from '../record.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent implements OnInit, OnDestroy {
  records: Record[];
  subscription: Subscription;

  constructor(private recordService: RecordService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.subscription = this.recordService.recordsChanged
      .subscribe(
        (recipes: Record[]) => {
          this.recordService.getRecords()
            .then(rec =>{
              this.records = rec;
            });
        }
      );
    this.recordService.getRecords().then(rec => {
      this.records = rec;
    });
  }

  onNewRecord() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
