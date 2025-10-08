import { Injectable } from "@angular/core";
import { ApiServices } from "../../api.services";
import {
  API_V1,
  COMPANY_CONTROLLER,
  DEPARTMENT_CONTROLLER,
  OPERATIONS,
  ZALO_OA,
  ZALO_VER,
} from "src/app/shared/common/constant";
import { HttpBackend, HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { ApiZaloOAServices } from "../../zalo-api.services";

@Injectable({ providedIn: "root" })
export class ZaloOARequestServices {
  accessToken: any
  private http: HttpClient;
  constructor(
    private zaloApiService: ApiZaloOAServices,
    private handler: HttpBackend
  ) {
    this.http = new HttpClient(handler);
    this.accessToken = localStorage.getItem("zalo_access_token");
  }
  getConversation(userId: string) {
    const data = JSON.stringify({
      user_id: userId,
      offset: 0,
      count: 10,
    });

    const url = `https://openapi.zalo.me/v2.0/oa/conversation?data=${encodeURIComponent(
      data
    )}`;
    const headers = new HttpHeaders({
      access_token: this.accessToken,
    });

    return this.http.get(url, { headers }).toPromise()
  }
  conversation(userId: any, offset: any = 0, count: any = 10) {
    return new Promise((resolve: any, reject: any) => {
      this.zaloApiService
        .get(
          ZALO_VER +
            ZALO_OA +
            `/conversation?data={"user_id":${userId},"offset":${offset},"count":${count}}`
        )
        .subscribe(
          (res: HttpResponse<any>) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
}