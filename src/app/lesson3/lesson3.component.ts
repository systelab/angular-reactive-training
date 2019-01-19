import { Component, OnInit } from '@angular/core';
import { concatMap } from 'rxjs/operators';
import { ApiService } from '../../common/api/api.service';
import { Terminal } from '../../common/terminal';

@Component({
  selector:    'app-lesson3',
  templateUrl: './lesson3.component.html'
})
export class Lesson3Component implements OnInit {

  public calculatedValue: number;
  public errorMessage = '';

  public terminal = new Terminal();

  constructor(protected apiService: ApiService) {
  }

  public ngOnInit() {
    this.run();
  }

  public run() {
    this.calculatedValue = undefined;
    this.errorMessage = '';
    this.terminal.reset();
    this.apiService.firstObservable(this.terminal)
      .pipe(
        concatMap(n => this.apiService.secondObservable(n, this.terminal)),
        concatMap(n => this.apiService.thirdObservable(n, this.terminal)),
        concatMap(n => this.apiService.fourthObservable(n, this.terminal)),
        concatMap(n => this.apiService.fifthObservable(n, this.terminal)))
      .subscribe(n => this.calculatedValue = n, e => this.errorMessage = e.message);
  }
}