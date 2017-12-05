import { Car } from '../shared/car.model';
import { Circuit } from '../shared/circuit.model';

export class Record {
  private id: string;
  private _time: number;
  private _weather: string;
  private _circuit: Circuit;
  private _car: Car;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  public get _id(): string {
    return this.id;
  }

  public set _id(n: string) {
    this.id = n;
  }

  public get time(): number {
    return this._time;
  }

  public set time (n: number) {
    this._time = n;
  }

  public get weather(): string {
    return this._weather;
  }

  public set weather(d: string) {
    this._weather = d;
  }

  public get circuit(): Circuit {
    return this._circuit;
  }

  public set circuit(i: Circuit) {
    this._circuit = i;
  }

  public get car(): Car {
    return this._car;
  }

  public set car(i: Car) {
    this._car = i;
  }
}

  // constructor(name: string, desc: string, imagePath: string, ingredients: Ingredient[]) {
  //   this.name = name;
  //   this.description = desc;
  //   this.imagePath = imagePath;
  //   this.ingredients = ingredients;




