/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseBorrowedEquipmentResponse } from '../../models/page-response-borrowed-equipment-response';

export interface FindAllBorrowedEquipments$Params {
  page?: number;
  size?: number;
}

export function findAllBorrowedEquipments(http: HttpClient, rootUrl: string, params?: FindAllBorrowedEquipments$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBorrowedEquipmentResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllBorrowedEquipments.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseBorrowedEquipmentResponse>;
    })
  );
}

findAllBorrowedEquipments.PATH = '/equipments/borrowed';
