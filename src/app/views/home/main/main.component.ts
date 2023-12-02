import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, Subject, Subscription} from "rxjs";
import {CartService} from "../../../shared/services/cart.service";

// declare var bootstrap: any;

// import * as bootstrap from "bootstrap";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  private subject: Subject<number>;

  constructor(public cartService: CartService) {
    this.subject = new Subject<number>();
    let count = 0;

    const interval = setInterval(() => {
      this.subject.next(count++);
    }, 1000);
    const timeout1 = setTimeout(() => {
      this.subject.complete();
    });
  }

  private subscription: Subscription | null = null;

  ngOnInit() {

    // const myModalAlternative = new bootstrap.Modal('#myModal', {})
    // myModalAlternative.show();

    this.subscription = this.subject.subscribe(
      {
        next: (param: number) => {
          console.log('subs 1 ' + param);
        },
        error: (err: string) => {
          console.log('error ' + err);
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  test() {
    this.subject
      .pipe(
        map(number => {
          return "Number " + number;
        })
      )
  }

}
