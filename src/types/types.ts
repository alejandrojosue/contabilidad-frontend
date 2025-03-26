type detailsErrResponse = {
  value: string,
  msg: string,
}

export interface errorResponse {
  error?: {msg: string, details: Array<detailsErrResponse>}
}

export interface dataResponse<T> extends errorResponse {
  count: number, limit: number, values: Array<T>, loading: boolean
}

export interface userResponse extends errorResponse {
  id: number, email: string, username: string, jwt: string,
}

export interface confirmResponse extends Pick<userResponse, 'id' | 'email'>, errorResponse {}

export class dartea implements errorResponse{};

export type actions = 'POST'|'PUT'|'GET'|'DELETE'

export type auditing = {
  id: number,
  act: actions,
  tbl_name: string,
  usr_id: number,
  usr_tp: 'ADMIN'|'USER',
  crt_at: Date,
  desc: string
}

export interface auditingResponse extends dataResponse<auditing> {}

export type customer = {
  id: number,
  customer_rtn: string,
  customer_name: string,
  customer_address: string,
  customer_phones: Array<string>,
  customer_additional_data: Object,
  customer_created_at: Date
}

export interface customerResponse extends dataResponse<customer> {}

export type branch = {
  id: number,
  branch_name: string,
  branch_address: string,
  branch_email: string,
  branch_phones: Array<string>,
  branch_owner: string,
  branch_is_active: boolean,
}

export interface branchResponse extends dataResponse<branch> {}
