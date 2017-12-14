import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Record } from '../record.model';
import { RecordService } from '../record.service';
import {Car} from '../../shared/car.model';
import {element} from 'protractor';
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
  chosenBrand: string;
  chosenName: string;


  constructor(private recordService: RecordService,
              private router: Router,
              private route: ActivatedRoute) {


  }

  ngOnInit() {
    this.subscription = this.recordService.recordsChanged
      .subscribe(
        (recipes: Record[]) => {
          this.recordService.getRecords()
            .then(rec => {
              this.records = rec;
            });
        }
      );
    this.recordService.getRecords().then(rec => {
      this.records = rec;
      console.log(this.records);
    });
    this.getAllBrands();
    this.getAllCircuitNames();
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



  toFilter() {
    console.log(this.chosenBrand);
    console.log(this.chosenName);

    if ((this.chosenName == null || this.chosenName === '-' ) && (this.chosenBrand !== null || this.chosenBrand !== '-')) {
      this.recordService.getRecordsCarFilter(this.chosenBrand).then(rec => {
        this.records = rec;
        console.log(this.records);
      });
    } else if ((this.chosenBrand == null || this.chosenBrand === '-')  && (this.chosenName !== null || this.chosenName !== '-')) {
      this.recordService.getRecordsCircuitFilter(this.chosenName).then(rec => {
        this.records = rec;
        console.log(this.records);
      });
    } else if ((this.chosenBrand !== null || this.chosenBrand !== '-' ) && (this.chosenName !== null || this.chosenName !== '-')) {
      this.recordService.getRecordsCircuitCarFilter(this.chosenName, this.chosenBrand).then(rec => {
        this.records = rec;
        console.log(this.records);
      });
    } else {
      this.recordService.getRecords().then( rec => {
        this.records = rec;
        console.log(this.records);
      });
    }
  }

  onNewRecord() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
