/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseEquipmentResponse } from '../../models/page-response-equipment-response';

export interface FindAllEquipmentsByOwner$Params {
  page?: number;
  size?: number;
}

export function findAllEquipmentsByOwner(http: HttpClient, rootUrl: string, params?: FindAllEquipmentsByOwner$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseEquipmentResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllEquipmentsByOwner.PATH, 'get');
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

findAllEquipmentsByOwner.PATH = '/equipments/owner';
