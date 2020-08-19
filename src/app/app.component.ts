import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = 'app';
  constructor() {}


  ngOnInit() {
  }
}
