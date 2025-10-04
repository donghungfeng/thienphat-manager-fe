import { Injectable } from "@angular/core";
import { ApiServices } from "../../api.services";
import { API_V1, USER_CONTROLLER } from "src/app/shared/common/constant";
import { HttpResponse } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class AuthRequestServices { 
  constructor(
    private apiService: ApiServices
  ) {
    
  }
  login(payload: any) {
    return new Promise((resolve: any, reject: any) => {
      this.apiService.postOption(API_V1 + USER_CONTROLLER, payload, '/login').subscribe(
        (res: HttpResponse<any>) => {
          resolve(res)
        },
        (err) => {
          reject(err)
        }
      )
    })
  }
}