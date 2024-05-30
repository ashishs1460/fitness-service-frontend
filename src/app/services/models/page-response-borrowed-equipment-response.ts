/* tslint:disable */
/* eslint-disable */
import { BorrowedEquipmentResponse } from '../models/borrowed-equipment-response';
export interface PageResponseBorrowedEquipmentResponse {
  content?: Array<BorrowedEquipmentResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
