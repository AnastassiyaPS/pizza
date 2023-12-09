import {Injectable} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map, Observable, of, tap} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  private products: ProductType[] = [];
  // private products: ProductType[] = [
  //     {
  //         id: 1,
  //         image: 'pizza_1.png',
  //         title: 'Мясная Делюкс',
  //         description: 'Пепперони, лук, бекон, томатная паста, колбаски, перец, грибы, соус чили, ананасы'
  //     },
  //     {
  //         id: 2,
  //         image: 'pizza_2.png',
  //         title: 'Морская Премиум',
  //         description: 'Перец, сыр, креветки, кальмары, мидии, лосось'
  //     },
  //     {
  //         id: 3,
  //         image: 'pizza_3.png',
  //         title: 'Бекон и Сосиски',
  //         description: 'Бекон, сыр, сосиски, ананас, томатная паста'
  //     },
  //     {
  //         id: 4,
  //         image: 'pizza_4.png',
  //         title: 'Куриная Делюкс',
  //         description: 'Курица, ананас, сыр Пепперони, соус для пиццы, томатная паста'
  //     },
  //     {
  //         id: 5,
  //         image: 'pizza_5.png',
  //         title: 'Барбекю Премиум',
  //         description: 'Свинина BBQ, соус Барбкею, сыр, курица, соус для пиццы, соус чили'
  //     },
  //     {
  //         id: 6,
  //         image: 'pizza_6.png',
  //         title: 'Пепперони Дабл',
  //         description: 'Пепперони, сыр, колбаса 2 видов: обжаренная и вареная'
  //     },
  //     {
  //         id: 7,
  //         image: 'pizza_7.png',
  //         title: 'Куриное трио',
  //         description: 'Жареная курица, Тушеная курица, Куриные наггетсы, перец, сыр, грибы, соус для пиццы'
  //     },
  //     {
  //         id: 8,
  //         image: 'pizza_8.png',
  //         title: 'Сырная',
  //         description: 'Сыр Джюгас, Сыр с плесенью, Сыр Моцарелла, Сыр секретный'
  //     },
  // ];

  getProducts(): Observable<ProductType[]> {
    // return this.products;

    // let params = new HttpParams();
    // params = params.set('extraField', 1);
    // return this.http.get<{ data: ProductType[] }>('http://testologia.site/pizzas', {
    //   headers: new HttpHeaders({Authorization: 'auth-token'}),
    //   params: params
    // })
    //   .pipe(
    //     tap((result => {
    //       console.log(result);
    //     })),
    //     map((result) => (result.data)),
    //     // catchError(error => {
    //     //   // throw new Error('omg');
    //     //   return of([]);
    //     // })
    //   )

    return this.http.get<ProductType[]>(environment.apiURL + 'pizzas');
  }

  getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(environment.apiURL + `pizzas?id=${id}`);
    // return this.http.get<ProductType>('https://testologia.site/pizzas?id=' + id);
  }

  createOrder(data: { product: string, address: string, phone: string }) {
    return this.http.post<{ success: boolean, message?: string }>(environment.apiURL + `/order-pizza`, data);
  }

}
