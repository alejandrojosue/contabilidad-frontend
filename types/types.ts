export interface errorResponse {
  error?: {msg: string, details: []}
}

export interface dataResponse<T> extends errorResponse {
  count: number, limit: number, values: Array<T>,
}

export interface registerResponse extends errorResponse {
  id: number|null|undefined, email: string|null|undefined,
}

export interface confirmResponse extends errorResponse, registerResponse {}

export interface loginResponse extends registerResponse, errorResponse {
  username: string|null|undefined, jwt: string|null|undefined,
}

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