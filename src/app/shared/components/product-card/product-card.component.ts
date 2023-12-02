import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {TitleComponent} from "../title/title.component";
import {CartProductService} from "../../services/cart-product.service";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  providers: [CartProductService]
})
export class ProductCardComponent {

  @Input() product: ProductType;
  // @Output() addToCartEvent: EventEmitter<ProductType> = new EventEmitter<ProductType>();
  @Output() addToCartEvent: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild(TitleComponent)
  private titleComponent!: TitleComponent;

  @ViewChild('elem')
  private elem!: ElementRef;
  // !!! обратить внимание, что этот elem не будет доступен в конструкторе или в ngOnInit, у него еще будет undefined
  // и для него нужно создать ngAfterViewInit();

  constructor(public cartProductService: CartProductService) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      description: ''
    }
  }

  // addProductToCart() {
  //   this.addToCartEvent.emit(this.titleComponent.toUpper());
  // }

}
