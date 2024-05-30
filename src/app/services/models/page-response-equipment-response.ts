/* tslint:disable */
/* eslint-disable */
import { EquipmentResponse } from '../models/equipment-response';
export interface PageResponseEquipmentResponse {
  content?: Array<EquipmentResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
