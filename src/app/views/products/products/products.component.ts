import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {CartService} from "../../../shared/services/cart.service";
import {Router} from "@angular/router";
import {ProductService} from "../../../shared/services/product.service";
import {HttpClient} from "@angular/common/http";
import {catchError, map, of, Subscription, tap} from "rxjs";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  constructor(private productService: ProductService, private http: HttpClient, private router: Router) {
  }

  public products: ProductType[] = [];
  public loading: boolean = false;
  private subscription: Subscription | null = null;

  ngOnInit() {
    // this.products = this.productService.getProducts();
    //this.http.get<ProductType[]>('http://testologia.site/pizzas')  // здесь будет возвращен observable объект, с которым мы будем работать дальше

    this.loading = true;
    this.subscription = this.productService.getProducts()
      .pipe(
        tap(() => {
          this.loading = false;
        })
      )

      .subscribe(
        {
          next: (data) => {
            this.products = data;
          },
          error: (error) => {
            console.log(error);
            this.router.navigate(['/']);
          }
        })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }


  // public addToCart(title: string): void {
  //   this.cartService.product = title;
  //   this.router.navigate(['/order'], {queryParams: {product: title}});
  // }
}
