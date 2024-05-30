/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { approveReturnBorrowedEquipment } from '../fn/equipments/approve-return-borrowed-equipment';
import { ApproveReturnBorrowedEquipment$Params } from '../fn/equipments/approve-return-borrowed-equipment';
import { borrowEquipment } from '../fn/equipments/borrow-equipment';
import { BorrowEquipment$Params } from '../fn/equipments/borrow-equipment';
import { EquipmentResponse } from '../models/equipment-response';
import { findAllBorrowedEquipments } from '../fn/equipments/find-all-borrowed-equipments';
import { FindAllBorrowedEquipments$Params } from '../fn/equipments/find-all-borrowed-equipments';
import { findAllEquipments } from '../fn/equipments/find-all-equipments';
import { FindAllEquipments$Params } from '../fn/equipments/find-all-equipments';
import { findAllEquipmentsByOwner } from '../fn/equipments/find-all-equipments-by-owner';
import { FindAllEquipmentsByOwner$Params } from '../fn/equipments/find-all-equipments-by-owner';
import { findAllReturnedEquipments } from '../fn/equipments/find-all-returned-equipments';
import { FindAllReturnedEquipments$Params } from '../fn/equipments/find-all-returned-equipments';
import { findEquipmentById } from '../fn/equipments/find-equipment-by-id';
import { FindEquipmentById$Params } from '../fn/equipments/find-equipment-by-id';
import { PageResponseBorrowedEquipmentResponse } from '../models/page-response-borrowed-equipment-response';
import { PageResponseEquipmentResponse } from '../models/page-response-equipment-response';
import { returnBorrowedEquipment } from '../fn/equipments/return-borrowed-equipment';
import { ReturnBorrowedEquipment$Params } from '../fn/equipments/return-borrowed-equipment';
import { saveEquipment } from '../fn/equipments/save-equipment';
import { SaveEquipment$Params } from '../fn/equipments/save-equipment';
import { updateArchivedStatus } from '../fn/equipments/update-archived-status';
import { UpdateArchivedStatus$Params } from '../fn/equipments/update-archived-status';
import { updateShareableStatus } from '../fn/equipments/update-shareable-status';
import { UpdateShareableStatus$Params } from '../fn/equipments/update-shareable-status';
import { uploadEquipmentImage } from '../fn/equipments/upload-equipment-image';
import { UploadEquipmentImage$Params } from '../fn/equipments/upload-equipment-image';

@Injectable({ providedIn: 'root' })
export class EquipmentsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllEquipments()` */
  static readonly FindAllEquipmentsPath = '/equipments';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllEquipments()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllEquipments$Response(params?: FindAllEquipments$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseEquipmentResponse>> {
    return findAllEquipments(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllEquipments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllEquipments(params?: FindAllEquipments$Params, context?: HttpContext): Observable<PageResponseEquipmentResponse> {
    return this.findAllEquipments$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseEquipmentResponse>): PageResponseEquipmentResponse => r.body)
    );
  }

  /** Path part for operation `saveEquipment()` */
  static readonly SaveEquipmentPath = '/equipments';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveEquipment()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveEquipment$Response(params: SaveEquipment$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveEquipment(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveEquipment$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveEquipment(params: SaveEquipment$Params, context?: HttpContext): Observable<number> {
    return this.saveEquipment$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `uploadEquipmentImage()` */
  static readonly UploadEquipmentImagePath = '/equipments/image/{equipment-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadEquipmentImage()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadEquipmentImage$Response(params: UploadEquipmentImage$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
    return uploadEquipmentImage(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadEquipmentImage$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadEquipmentImage(params: UploadEquipmentImage$Params, context?: HttpContext): Observable<{
}> {
    return this.uploadEquipmentImage$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
}>): {
} => r.body)
    );
  }

  /** Path part for operation `borrowEquipment()` */
  static readonly BorrowEquipmentPath = '/equipments/borrowed/{equipment-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `borrowEquipment()` instead.
   *
   * This method doesn't expect any request body.
   */
  borrowEquipment$Response(params: BorrowEquipment$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return borrowEquipment(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `borrowEquipment$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  borrowEquipment(params: BorrowEquipment$Params, context?: HttpContext): Observable<number> {
    return this.borrowEquipment$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `updateShareableStatus()` */
  static readonly UpdateShareableStatusPath = '/equipments/shareable/{equipment-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateShareableStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateShareableStatus$Response(params: UpdateShareableStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateShareableStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateShareableStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateShareableStatus(params: UpdateShareableStatus$Params, context?: HttpContext): Observable<number> {
    return this.updateShareableStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `returnBorrowedEquipment()` */
  static readonly ReturnBorrowedEquipmentPath = '/equipments/borrowed/returned/{equipment-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `returnBorrowedEquipment()` instead.
   *
   * This method doesn't expect any request body.
   */
  returnBorrowedEquipment$Response(params: ReturnBorrowedEquipment$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return returnBorrowedEquipment(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `returnBorrowedEquipment$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  returnBorrowedEquipment(params: ReturnBorrowedEquipment$Params, context?: HttpContext): Observable<number> {
    return this.returnBorrowedEquipment$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `approveReturnBorrowedEquipment()` */
  static readonly ApproveReturnBorrowedEquipmentPath = '/equipments/borrowed/returned/approve/{equipment-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `approveReturnBorrowedEquipment()` instead.
   *
   * This method doesn't expect any request body.
   */
  approveReturnBorrowedEquipment$Response(params: ApproveReturnBorrowedEquipment$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return approveReturnBorrowedEquipment(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `approveReturnBorrowedEquipment$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  approveReturnBorrowedEquipment(params: ApproveReturnBorrowedEquipment$Params, context?: HttpContext): Observable<number> {
    return this.approveReturnBorrowedEquipment$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `updateArchivedStatus()` */
  static readonly UpdateArchivedStatusPath = '/equipments/archived/{equipment-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateArchivedStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateArchivedStatus$Response(params: UpdateArchivedStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateArchivedStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateArchivedStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateArchivedStatus(params: UpdateArchivedStatus$Params, context?: HttpContext): Observable<number> {
    return this.updateArchivedStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findEquipmentById()` */
  static readonly FindEquipmentByIdPath = '/equipments/{equipment-id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findEquipmentById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findEquipmentById$Response(params: FindEquipmentById$Params, context?: HttpContext): Observable<StrictHttpResponse<EquipmentResponse>> {
    return findEquipmentById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findEquipmentById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findEquipmentById(params: FindEquipmentById$Params, context?: HttpContext): Observable<EquipmentResponse> {
    return this.findEquipmentById$Response(params, context).pipe(
      map((r: StrictHttpResponse<EquipmentResponse>): EquipmentResponse => r.body)
    );
  }

  /** Path part for operation `findAllReturnedEquipments()` */
  static readonly FindAllReturnedEquipmentsPath = '/equipments/returned';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllReturnedEquipments()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllReturnedEquipments$Response(params?: FindAllReturnedEquipments$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBorrowedEquipmentResponse>> {
    return findAllReturnedEquipments(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllReturnedEquipments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllReturnedEquipments(params?: FindAllReturnedEquipments$Params, context?: HttpContext): Observable<PageResponseBorrowedEquipmentResponse> {
    return this.findAllReturnedEquipments$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseBorrowedEquipmentResponse>): PageResponseBorrowedEquipmentResponse => r.body)
    );
  }

  /** Path part for operation `findAllEquipmentsByOwner()` */
  static readonly FindAllEquipmentsByOwnerPath = '/equipments/owner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllEquipmentsByOwner()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllEquipmentsByOwner$Response(params?: FindAllEquipmentsByOwner$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseEquipmentResponse>> {
    return findAllEquipmentsByOwner(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllEquipmentsByOwner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllEquipmentsByOwner(params?: FindAllEquipmentsByOwner$Params, context?: HttpContext): Observable<PageResponseEquipmentResponse> {
    return this.findAllEquipmentsByOwner$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseEquipmentResponse>): PageResponseEquipmentResponse => r.body)
    );
  }

  /** Path part for operation `findAllBorrowedEquipments()` */
  static readonly FindAllBorrowedEquipmentsPath = '/equipments/borrowed';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllBorrowedEquipments()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllBorrowedEquipments$Response(params?: FindAllBorrowedEquipments$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseBorrowedEquipmentResponse>> {
    return findAllBorrowedEquipments(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllBorrowedEquipments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllBorrowedEquipments(params?: FindAllBorrowedEquipments$Params, context?: HttpContext): Observable<PageResponseBorrowedEquipmentResponse> {
    return this.findAllBorrowedEquipments$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseBorrowedEquipmentResponse>): PageResponseBorrowedEquipmentResponse => r.body)
    );
  }

}
