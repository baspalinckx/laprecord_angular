import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {environment} from '../../environments/environment';
import {Http, Headers} from '@angular/http';
import {Record} from './record.model';
import {Car} from '../shared/car.model';
import {Circuit} from '../shared/circuit.model';


@Injectable()
export class RecordService {
  recordsChanged = new Subject<Record[]>();

  private headers = new Headers({'Content-Type': 'application/json'});
  private serverUrl = environment.serverUrl + '/records/'; // URL to web api

  private records: Record[];

  constructor(private http: Http) {
  }

  getRecords() {
    return this.http.get(this.serverUrl, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.records = response.json().record as Record[];
        return response.json().record as Record[];
      })
      .catch(error => {
        return error;
      });
  }

  getRecord(index: string) {
    if (index == null)
      return null;
    return this.http.get(this.serverUrl + index, {headers: this.headers})
      .toPromise()

      .then(response => {
        return response.json().record[0];
      })
      .catch(error => {

        return error;
      });
  }

  getRecordsCarFilter(brand: string) {
    if(brand == null)
      return null;
    return this.http.get(this.serverUrl + 'car/' + brand, {headers: this.headers})
      .toPromise()
      .then(response => {
      this.records = response.json().record as Record[];
      return response.json().record as Record[];
    })
      .catch(error => {
        return error;
      });
  }

  getRecordsCircuitFilter(name: string) {
    if(name == null)
      return null;
    return this.http.get(this.serverUrl + 'circuit/' + name, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.records = response.json().record as Record[];
        return response.json().record as Record[];
      })
      .catch(error => {
        return error;
      });
  }

  getRecordsCircuitCarFilter(name: string, brand: string) {
    if (name && brand == null)
      return null;
    return this.http.get(this.serverUrl + 'circuit/' + name +  '/car/' + brand, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.records = response.json().record as Record[];
        return response.json().record as Record[];
      })
      .catch(error => {
        return error;
      });
  }


  // addIngredientsToShoppingList(ingredients: Ingredient[]) {
  //   this.slService.addIngredients(ingredients);
  // }

  addRecord(record: Record) {
    return this.http.post(this.serverUrl, record, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.recordsChanged.next(this.records.slice());
      });
  }

  updateRecord(index: string, newRecord: Record) {
    return this.http.put(this.serverUrl + index, newRecord, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.recordsChanged.next(this.records.slice());
      });
  }

  deleteRecord(index: string) {
    return this.http.delete(this.serverUrl + index, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.recordsChanged.next(this.records.slice());
      });
  }
}
