import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {map, Subject, Subscription} from "rxjs";
import {CartService} from "../../../shared/services/cart.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PopupComponent} from "../../../shared/components/popup/popup.component";
import {environment} from "../../../../environments/environment";

// declare var bootstrap: any;

// import * as bootstrap from "bootstrap";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {

  private subject: Subject<number>;

  constructor(public cartService: CartService, private modalService: NgbModal) {
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

  @ViewChild(PopupComponent)
  private popupComponent!: PopupComponent;

  ngAfterViewInit() {
    this.popupComponent.open();
  }

  ngOnInit() {

    console.log(environment.production);

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
