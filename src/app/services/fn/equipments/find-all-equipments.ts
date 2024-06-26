/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseEquipmentResponse } from '../../models/page-response-equipment-response';

export interface FindAllEquipments$Params {
  page?: number;
  size?: number;
}

export function findAllEquipments(http: HttpClient, rootUrl: string, params?: FindAllEquipments$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseEquipmentResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllEquipments.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseEquipmentResponse>;
    })
  );
}

findAllEquipments.PATH = '/equipments';
