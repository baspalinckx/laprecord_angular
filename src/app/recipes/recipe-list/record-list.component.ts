import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Record } from '../record.model';
import { RecordService } from '../record.service';
import {Car} from "../../shared/car.model";
import {element} from "protractor";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent implements OnInit, OnDestroy {
  records: Record[];
  brands: String[];
  cNames: String[];
  subscription: Subscription;

  constructor(private recordService: RecordService,
              private router: Router,
              private route: ActivatedRoute) {
    this.brands = new Array<string>();
    this.cNames = new Array<string>();
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

  getAllBrands() {

    this.brands = new Array<string>();
    this.recordService.getRecords().then(rec => {
      this.records = rec;
      this.records.forEach(element => {
        this.brands.push(element.car.brand);
        console.log(this.brands);
      });
    });
  }
  getAllCircuitNames() {
    this.cNames = new Array<string>();
    this.recordService.getRecords().then(rec => {
      this.records = rec;
      this.records.forEach(element => {
        this.cNames.push(element.circuit.name);
        console.log(this.cNames);
      });
    });
  }

  onNewRecord() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
