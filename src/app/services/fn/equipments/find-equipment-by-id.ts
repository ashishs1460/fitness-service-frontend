/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { EquipmentResponse } from '../../models/equipment-response';

export interface FindEquipmentById$Params {
  'equipment-id': number;
}

export function findEquipmentById(http: HttpClient, rootUrl: string, params: FindEquipmentById$Params, context?: HttpContext): Observable<StrictHttpResponse<EquipmentResponse>> {
  const rb = new RequestBuilder(rootUrl, findEquipmentById.PATH, 'get');
  if (params) {
    rb.path('equipment-id', params['equipment-id'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<EquipmentResponse>;
    })
  );
}

findEquipmentById.PATH = '/equipments/{equipment-id}';
