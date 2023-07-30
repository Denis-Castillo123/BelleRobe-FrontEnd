import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const STORE_BASE_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private httpClient: HttpClient) { }

  getAllProducts(limit: number, sort: string, category?: string): Observable<Array<Product>> {
    let url = `${STORE_BASE_URL}/vestido/consultarTodos`;

    if (category !== '') {
      url += `/${category}`;
    }

    return this.httpClient.get<any>(url, {
      headers: {
        'requiredToken': 'false'
      }
    }).pipe(
      map(response => response.list as Product[])
    );
  }


    // getAllCategories(): Observable<Array<string>>{
    //   console.log("updated api")
    //   return this.httpClient.get<Array<string>>(
    //     `${STORE_BASE_URL}/vestido/categories`, {
    //       headers: {
    //         'requiredToken': 'false'
    //       }
    //     }
    //   )}

      /*sayHello(): Observable<any>{
        console.log("called sayhello service observable")
        return this.httpClient.get(
          `${STORE_BASE_URL}/vestido/`, {
            headers: {
              'requiredToken': 'false'
            }
          }
        )}

        */
      }


