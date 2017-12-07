import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, ControlValueAccessor } from '@angular/forms';
import { Response } from '@angular/http';

import { RecordService } from '../record.service';
import {Record} from '../record.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: string;

  editMode = false;
  recordForm: FormGroup;
  circuitForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recordService: RecordService,
              private router: Router,
              ) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);
    if (this.editMode) {
      this.recordService.updateRecord(this.id, this.recordForm.value);
    } else {
      this.recordService.addRecord(this.recordForm.value);
      this.recordService.getRecords()
        .then(recipes => {
          this.recordService.recordsChanged.next(recipes.slice());
        });
    }
    this.onCancel();
  }

  // onAddIngredient() {
  //   (<FormArray>this.recipeForm.get('ingredients')).push(
  //     new FormGroup({
  //       'name': new FormControl(null, Validators.required),
  //       'amount': new FormControl(null, [
  //         Validators.required,
  //         Validators.pattern(/^[1-9]+[0-9]*$/)
  //       ])
  //     })
  //   );
  // }
  //
  // onDeleteIngredient(index: number) {
  //   (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  // }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {

    let editrecord = new Record({time: '', weather: ''});
    let editcircuit = new Record({name: '', country: '', length: ''})


    const recordCircuit = new FormControl();
    const recordCar = new FormControl();


    if (this.editMode) {
      this.recordService.getRecord(this.id)
        .then(record => {
          editrecord = record;

          this.recordForm = new FormGroup({
            'time': new FormControl(record.time, Validators.required),
            'weather': new FormControl(record.weather, Validators.required),
            'car': new FormGroup({
              'brand': new FormControl(record.car.brand, Validators.required),
              'model': new FormControl(record.car.model, Validators.required),
              'type': new FormControl(record.car.type, Validators.required),
              'year': new FormControl(record.car.year, Validators.required),
              'modification': new FormControl(record.car.modification, Validators.required),
              'tire': new FormControl(record.car.tire, Validators.required),
              'imagePath': new FormControl(record.car.imagePath, Validators.required)
            }),
            'circuit': new FormGroup({
              'name': new FormControl(record.circuit.name, Validators.required),
              'country': new FormControl(record.circuit.country, Validators.required),
              'length' : new FormControl(record.circuit.length, Validators.required)
            })
          });
        })
        .catch(error => console.log(error));
    }

      this.recordForm = new FormGroup({
        'time': new FormControl('', Validators.required),
        'weather': new FormControl('', Validators.required),
        'car': new FormGroup({
          'brand': new FormControl('', Validators.required),
          'model': new FormControl('', Validators.required),
          'type': new FormControl('', Validators.required),
          'year': new FormControl('', Validators.required),
          'modification': new FormControl('', Validators.required),
          'tire': new FormControl('', Validators.required),
          'imagePath': new FormControl('', Validators.required)
        }),
        'circuit': new FormGroup({
          'name': new FormControl('', Validators.required),
          'country': new FormControl('', Validators.required),
          'length' : new FormControl('', Validators.required)
    })
      });
    }
}
