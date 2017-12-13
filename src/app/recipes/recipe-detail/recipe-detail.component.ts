import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {Record} from '../record.model';
import {RecordService} from '../record.service';
import {Car} from "../../shared/car.model";


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  record: Record = new Record({car: {imagePath: ''}, circuit: {name: ''}});
  cars: Car[];
  id: string;

  constructor(private recordService: RecordService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          console.log(this.id);
          this.recordService.getRecord(this.id).then(rec => {
            this.record = rec;
            console.log(this.record);
            this.recordService.getCarsfromCircuit(this.record.circuit.name)
              .then( cars => {
                this.cars = cars;
              });
          });


        }
      );
  }

  // onAddToShoppingList() {
  //   this.recordService.addIngredientsToShoppingList(this.recipe.ingredients);
  // }

  getCarsfromCircuit(id: string) {
    this.cars = new Array<Car>();
    this.recordService.getRecord(id).then(rec => {
      this.record = rec;
      this.recordService.getCarsfromCircuit(this.record.circuit.name).then(cars => {
        this.cars.push(cars);
        console.log('uit de service' + this.cars);
      });
    });
  }


  onEditRecord() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecord() {
    if (window.confirm('Are sure you want to delete this record ?')) {
      this.recordService.deleteRecord(this.id);
      this.router.navigate(['/recipes']);
    }
  }

}
